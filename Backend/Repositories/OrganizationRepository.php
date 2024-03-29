<?php

require_once '../Database.php';
require_once '../DTOs/OrganizationDTO.php';

require_once '../Repositories/ActivityRepository.php';
require_once '../Repositories/PostRepository.php';

class OrganizationRepository
{

  private static $instance = null;
  private $db;


  public function __construct()
  {
    $this->db = Database::getInstance()->getConnection();
  }

  public static function getInstance()
  {
    if (!self::$instance) {
      self::$instance = new OrganizationRepository();
    }
    return self::$instance;
  }

  /**
   * get info of all organizations
   * @return void
   */
  public function fetchAllOrganizations()
  {

    $response = null;

    $stmt = $this->db->prepare("
            SELECT
                *
            FROM
                organization");
    $stmt->execute();
    $result = $stmt->get_result();

    $organizations = [];

    if ($result) {
      //as long as there is a result, push a new organization DTO
      while ($row = $result->fetch_assoc()) array_push($organizations, new OrganizationDTO($row["ID_ORGANIZATION"], $row["NAME_ORGANIZATION"], $row["AVATAR"], $row["DESCRIPTION"]));
      $response = array(
        'success' => true,
        'organizations' => $organizations
      );
    } else {
      $response = array(
        'success' => false,
        'message' => 'could not get bdd info: getAllOrganizations'
      );
    }

    echo json_encode($response);
  }

  public function getTop3()
  {
    $stmt = $this->db->prepare("
            SELECT
	            act.ID_ACTIVITY
                , hob.HOBBY_NAME
                , COUNT(*)
            FROM
	            activity act
	            INNER JOIN hobby hob
	                ON hob.ID_HOBBY = act.ID_HOBBY
            GROUP BY
	            act.ID_HOBBY
                , hob.HOBBY_NAME
            ORDER BY
	            COUNT(*) DESC LIMIT 3
            ;
        "); //SQL request used to find the 3 activities with most posts in it
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) { // if the result has more than 0 rows it means he fetched something
      $activitiesDTO = []; //initialize activitiesDTO as en empty array
      while ($row = $result->fetch_assoc()) {
        $activityDTO = $this->findActivityById($row['ID_ACTIVITY']);
        if ($activityDTO)
          $activitiesDTO[] = $activityDTO;
      }
      return $activitiesDTO;
    }
    return null;
  }


  /**
   * get all information of an activity thakns to its ID
   * @param $id_activity
   * @return ActivityDTO|null
   */
  public function findActivityById($id_activity)
  {

    $userRep = UserRepository::getInstance();
    $hobRep = HobbyRepository::getInstance();

    //find information on the activity, activity direcot, and counts the number of participants
    $stmt = $this->db->prepare("
    SELECT
        act.*,
        org.ID_ORGANIZATION,
        org.NAME_ORGANIZATION,
        COUNT(ap.ID_USER) AS participant_count
    FROM
        activity act
        INNER JOIN activity_director actd ON act.ID_ACTIVITY_DIRECTOR = actd.ID_USER
        INNER JOIN organization org ON actd.ID_ORGANIZATION = org.ID_ORGANIZATION
        LEFT JOIN activity_participants ap ON act.ID_ACTIVITY = ap.ID_ACTIVITY
    WHERE
        act.ID_ACTIVITY = ?
    GROUP BY
        act.ID_ACTIVITY
    ;
    ");// SQL request to find an activity with its ID

    $stmt->bind_param('i', $id_activity);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
      $row = $result->fetch_assoc();
      $userDTO = $userRep->findUserById($row['ID_ACTIVITY_DIRECTOR']);
      $hobbyDTO = $hobRep->findHobbyById($row['ID_HOBBY']);

      return new ActivityDTO($row['ID_ACTIVITY'], $userDTO, $hobbyDTO, $row['ADVANCEMENT'], $row['DESCRIPTION'],
        $row['DATE_POST'], $row['DATE_ACTIVITY'], $row['participant_count'], $row['MAX_REGISTRATIONS'],
        $row['IMAGE'], $row["TITLE"], $row['ID_ORGANIZATION'], new OrganizationDTO($row['ID_ORGANIZATION'], $row['NAME_ORGANIZATION'], null, null));
    }
    return null;
  }


  public function getOrganzationById($id_organization)
  {

    $response = null;

    $stmt = $this->db->prepare("
        SELECT
        *
        FROM
            organization
        WHERE
            ID_ORGANIZATION = ?");
    $stmt->bind_param("i", $id_organization);
    $stmt->execute();
    $result = $stmt->get_result();


    if ($result) {
      if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $organization = new OrganizationDTO($row["ID_ORGANIZATION"], $row["NAME_ORGANIZATION"], $row["AVATAR"], $row["DESCRIPTION"]);
        $response = array(
          'success' => 'true',
          'organization' => $organization
        );
      } else {
        $response = array(
          'success' => true,
          'message' => 'no organization with this id'
        );
      }
    } else {
      $response = array(
        'success' => true,
        'message' => 'could not access bdd info : getOrganizationById'
      );
    }


    echo json_encode($organization);
  }

  /**
   * create an organization
   * @param $userId
   * @param $organization
   * @return bool
   */
  public function addOrganization($userId, $organization)
  {
    $stmt = $this->db->prepare("
        INSERT INTO
           organization (NAME_ORGANIZATION, DESCRIPTION)
        VALUES
            (?, ?)
        ;
    ");
    $stmt->bind_param('ss', $organization['name_organization'], $organization['description']);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
      $organizationId = $stmt->insert_id;
      //modify the organization of the user who's created the organization
      $this->modifiyActivityDirectorOrganization($userId, $organizationId);

      return true;
    }
    return false;
  }

  /**
   * if activity_director has created anorganization, update their organization to the newly created one
   * @param $userId
   * @param $organizationId
   * @return void
   */
  public function modifiyActivityDirectorOrganization($userId, $organizationId)
  {
    // checks if user is activity director
    $stmt = $this->db->prepare("
      SELECT
          act_d.ID_USER
      FROM
          activity_director act_d
      WHERE
          act_d.ID_USER = ?
    ");
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows == 0) {
      //if user is not activity director, makes them one
      $stmt = $this->db->prepare("
        INSERT INTO
            activity_director (ID_ORGANIZATION, ID_USER)
        VALUES
            (?, ?)
      ");
    } else {
      //update the organization of the activity director
      $stmt = $this->db->prepare("
        UPDATE
            activity_director act_d
        SET
            act_d.ID_ORGANIZATION = ?
        WHERE
            act_d.ID_USER = ?
      ");
    }
    $stmt->bind_param("ii", $organizationId, $userId);

    $stmt->execute();
  }

  /**
   * sets a user as an activity director
   * @param $userId
   * @param $organizationId: organization to join
   * @return void
   */
  public function addActivityDirector($userId, $organizationId)
  {
    $stmt = $this->db->prepare("
        INSERT INTO
            activity_director (ID_USER, ID_ORGANIZATION)
        VALUES
            (?, ?)
        ;
      ");
    $stmt->bind_param("ii", $userId, $organizationId);

    $stmt->execute();
  }

  /**
   * get information on an organization
   * @param $organizationId
   * @return OrganizationDTO|null
   */
  public function findOrganizationById($organizationId)
  {
    $stmt = $this->db->prepare("
        SELECT
            org.*
        FROM
            organization org
        WHERE
            org.ID_ORGANIZATION = ?
    ");
    $stmt->bind_param('i', $organizationId);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      return new OrganizationDTO($row['ID_ORGANIZATION'], $row['NAME_ORGANIZATION'], $row['AVATAR'], $row['DESCRIPTION']);
    }
    return null;
  }

  /**
   * get the posts made by activity_director of an organization
   * @param $id_organization
   * @return array|PostDTO[]
   */
  public function fetchOrganizationPosts($id_organization)
  {
    $postRepository = PostRepository::getInstance();
    $stmt = $this->db->prepare("
      	  SELECT
       reg.ID_REGULAR_POST
      FROM
        ACTIVITY_DIRECTOR act_d
      INNER JOIN REGULAR_POST reg
      	ON act_d.ID_USER = reg.ID_USER
      WHERE
        act_d.ID_ORGANIZATION = ?
       ;");
    $stmt->bind_param("i", $id_organization);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
      $postsDTO = [];
      while ($row = $result->fetch_assoc()) {
        $postsDTO[] = $postRepository->findPostById($row['ID_REGULAR_POST']);
      }
      return $postsDTO;
    }

    return [new PostDTO(-1, $id_organization, new HobbyDTO(-1, "a", null), "", null, null, null)];
  }

  /**
   * get the activities posted by activity directors of this organization
   * @param $id_organization
   * @return ActivityDTO[]|array
   */
  public function fetchOrganizationActivities($id_organization)
  {

    $activityRepository = ActivityRepository::getInstance();

    $stmt = $this->db->prepare("
      SELECT
        act.ID_ACTIVITY
      FROM
        ACTIVITY_DIRECTOR act_d
      INNER JOIN ACTIVITY act
        ON act_d.ID_USER = act.ID_ACTIVITY_DIRECTOR
      WHERE
          act_d.ID_ORGANIZATION = ?
        ;");
    $stmt->bind_param("i", $id_organization);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
      $activityDTO = [];
      while ($row = $result->fetch_assoc()) {
        $activityDTO[] = $activityRepository->findActivityById($row['ID_ACTIVITY']);
      }
      return $activityDTO;
    }

    return [new ActivityDTO(-1, null, null, null, null, null, null, null, null, null, null, $id_organization, null)];

  }

  /**
   * send invitation to ativity director to join organization
   * @param $organizationId: organization asking to join
   * @param $userId
   * @return bool
   */
  public function sendInvitation($organizationId, $userId)
  {
    //checks if organization has not already sent an invitation to the user
    $stmt = $this->db->prepare("
        SELECT
          *
          FROM
            invitation_organization inv
        WHERE
            inv.ID_ORGANIZATION = ?
            AND
            inv.ID_USER = ?
        ;
    ");

    $stmt->bind_param("ii", $organizationId, $userId);
    $stmt->execute();

    $result = $stmt->get_result();
    //user has already sent invitation
    if ($result->num_rows > 0) {
      return false;
    }

    //insert invitation
    $stmt = $this->db->prepare("
        INSERT INTO
            invitation_organization (ID_ORGANIZATION, ID_USER)
        VALUES
            (?, ?)
    ");

    $stmt->bind_param("ii", $organizationId, $userId);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * checks if organization has already sent an invitation for a user to join them
   * @param $id_organization
   * @param $userId
   * @return bool
   */
  public function isUserAlreadyInvited($id_organization, $userId)
  {
    $stmt = $this->db->prepare("
        SELECT
            *
        FROM
            invitation_organization
        WHERE
            ID_ORGANIZATION = ?
            AND ID_USER = ?
    ");

    $stmt->bind_param("ii", $id_organization, $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
      return true;
    }

    return false;
  }

  /**
   * accept invitation from an organization to join them
   * @param mixed $organizationId
   * @param mixed $userId
   * @return bool
   */
  public function acceptInvitation(mixed $organizationId, mixed $userId)
  {
    $stmt = $this->db->prepare("
        UPDATE
            activity_director
        SET
            ID_ORGANIZATION = ?
        WHERE
            ID_USER = ?
    ");

    $stmt->bind_param("ii", $organizationId, $userId);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
      $this->removeInvitation($organizationId, $userId);
      return $stmt->affected_rows > 0;
    }
    return false;
  }

  /**
   * cancel an invitation for a user to join an organization or refuse invitation
   * @param $organizationId
   * @param $userId
   * @return bool
   */
  public function removeInvitation($organizationId, $userId)
  {

    //checks that invitation existss
    $stmt = $this->db->prepare("
        SELECT
          *
          FROM
            invitation_organization inv
        WHERE
            inv.ID_ORGANIZATION = ?
            AND
            inv.ID_USER = ?
        ;
    ");

    $stmt->bind_param("ii", $organizationId, $userId);
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows == 0) {
      return false;
    }

    //delte invitation
    $stmt = $this->db->prepare("
        DELETE FROM
            invitation_organization
        WHERE
            ID_ORGANIZATION = ?
            AND
            ID_USER = ?
    ");

    $stmt->bind_param("ii", $organizationId, $userId);
    $stmt->execute();

    return $stmt->affected_rows > 0;
  }

  /**
   * quit organization, sets activity_director to "independant"
   * @param mixed $organizationId
   * @param mixed $userId
   * @return bool
   */
  public function quitOrganization(mixed $organizationId, mixed $userId)
  {
    if ($this->isOnThisOrganization($organizationId, $userId)) {
      $stmt = $this->db->prepare("
        UPDATE
        activity_director
        SET
            ID_ORGANIZATION = 1
        WHERE
            ID_USER = ?
            AND
            ID_ORGANIZATION = ?
      ");

      $stmt->bind_param("ii", $userId, $organizationId);
      $stmt->execute();
      if ($stmt->affected_rows > 0) {
        $this->verifyIfStillMembers($organizationId);
        return true;
      }
      return false;
    }
    return false;
  }

  /**
   * checks if activity irector is part of organization
   */
  public function isOnThisOrganization(mixed $id_organization, mixed $userId)
  {
    $stmt = $this->db->prepare("
        SELECT
            act_d.ID_ORGANIZATION
        FROM
            activity_director act_d
        WHERE
            act_d.ID_USER = ?
            AND
            act_d.ID_ORGANIZATION = ?
    ");

    $stmt->bind_param("ii", $userId, $id_organization);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
      return true;
    }
    return false;
  }

  /** get all the activity_directors of an organization
   * @param mixed $id_organization
   * @return array
   */
  public function getOrganizationUsers(mixed $id_organization)
  {
    $stmt = $this->db->prepare("
        SELECT
            act_d.ID_USER
        FROM
            activity_director act_d
        WHERE
            act_d.ID_ORGANIZATION = ?
    ");
    $stmt->bind_param("i", $id_organization);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
      $usersDTO = [];
      while ($row = $result->fetch_assoc()) {
        require_once '../Repositories/UserRepository.php';
        $userRepository = UserRepository::getInstance();
        $usersDTO[] = $userRepository->findUserById($row['ID_USER']);
      }
      return $usersDTO;
    }
    return [];
  }

  /**
   * checks if organization has more than  0 members
   * @param mixed $organizationId
   * @return void
   */
  private function verifyIfStillMembers(mixed $organizationId)
  {
    $users = $this->getOrganizationUsers($organizationId);
    if(count($users) == 0) {
      //if 0 members delete organization
      $this->deleteOrganization($organizationId);
    }
  }

  /**
   * delte an organization
   * @param mixed $organizationId
   * @return bool
   */
  private function deleteOrganization(mixed $organizationId)
  {
    $stmt = $this->db->prepare("
        DELETE FROM
            organization
        WHERE
            ID_ORGANIZATION = ?
    ");
    $stmt->bind_param("i", $organizationId);
    $stmt->execute();

    return $stmt->affected_rows > 0;
  }


}
