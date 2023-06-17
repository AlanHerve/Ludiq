<?php
require_once '../Database.php';
require_once '../DTOs/ActivityDTO.php';
require_once '../DTOs/HobbyDTO.php';
require_once '../DTOs/UserDTO.php';
require_once '../DTOs/ActivityParticipantsDTO.php';
require_once '../Repositories/UserRepository.php';
require_once '../Repositories/HobbyRepository.php';
require_once '../Repositories/OrganizationRepository.php';


class ActivityRepository
{
  private static $instance = null;
  private $db;
  private $userRepository;
  private $hobbyRepository;

  private $organizationRepository;


  public function __construct()
  {
    // Assign the database connection to the $db variable
    $this->db = Database::getInstance()->getConnection();


    // Initialize other repositories
    $this->hobbyRepository = HobbyRepository::getInstance();
    $this->userRepository = UserRepository::getInstance();
    //$this->OrganizationRepository = OrganizationRepository::getInstance();
  }

  // method to get an instance of ActivityRepository
  public static function getInstance()
  {
    if (!self::$instance) { //if the instance doesn't exist then create a new one
      self::$instance = new ActivityRepository();

    }
    return self::$instance; //return the instance
  }

  public function newActivity(ActivityDTO $activityDTO)
  { //function to create a new activity with an activityDTO

    $id_user = $activityDTO->userDTO;

    $id_hobby = $activityDTO->hobbyDTO;
    $description = $activityDTO->description;
    $images = $activityDTO->images;
    $title = $activityDTO->title;
    $time = $activityDTO->time;


    $stmt = $this->db->prepare("INSERT INTO
                                                activity
                                                (ID_ACTIVITY_DIRECTOR
                                                , ID_HOBBY
                                                , DESCRIPTION
                                                , DATE_ACTIVITY
                                                , MAX_REGISTRATIONS
                                                , IMAGE
                                                , TITLE)
                                            VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("iississ", $id_user, $id_hobby, $description, $time, $activityDTO->max_registrations, $images, $title);
    $stmt->execute();

    if ($stmt->affected_rows > 0) { //if rows are affected it means the database has been modified
      $activityDTO->setID($stmt->insert_id);
      $response = array(
        'success' => 'true',
        'Activity' => $activityDTO,
      );
    } else { //if not, nothing has been added in the database, therefore there is a problem somewhere
      $response = array(
        'success' => 'false'
      );
    }

    return json_encode($response);
  }

  /**
   * @return array|null
   */
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
   * @param $id_activity
   * @return ActivityDTO|null
   */

  public function findActivityById($id_activity)
  {
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
      $userDTO = $this->userRepository->findUserById($row['ID_ACTIVITY_DIRECTOR']);
      $hobbyDTO = $this->hobbyRepository->findHobbyById($row['ID_HOBBY']);

      return new ActivityDTO($row['ID_ACTIVITY'], $userDTO, $hobbyDTO, $row['ADVANCEMENT'], $row['DESCRIPTION'],
        $row['DATE_POST'], $row['DATE_ACTIVITY'], $row['participant_count'], $row['MAX_REGISTRATIONS'],
        $row['IMAGE'], $row["TITLE"], $row['ID_ORGANIZATION'], new OrganizationDTO($row['ID_ORGANIZATION'], $row['NAME_ORGANIZATION'], null, null));
    }
    return null;
  }

  /**
   * @param $id_user
   * @return array
   */
  public function getUserActivities($id_user)
  {
    $stmt = $this->db->prepare("
            SELECT
                act.ID_ACTIVITY
            FROM
                user u
            INNER JOIN activity act
                ON act.ID_ACTIVITY_DIRECTOR = u.ID_USER
            WHERE
                act.ID_ACTIVITY_DIRECTOR = ?
            ;
        ");
    $stmt->bind_param('i', $id_user);
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
      $activitiesDTO = [];
      while ($row = $result->fetch_assoc()) {
        $activityDTO = $this->findActivityById($row['ID_ACTIVITY']);
        $activitiesDTO[] = $activityDTO;
      }
      return $activitiesDTO;
    }

    return [];
  }

  /**
   * @return array|null
   */
  public function getAllActivities()
  {
    $stmt = $this->db->prepare("
            SELECT
                act.ID_ACTIVITY
            FROM
                activity act
            ;
        ");
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
      $activitiesDTO = [];
      while ($row = $result->fetch_assoc()) {
        $activityDTO = $this->findActivityById($row['ID_ACTIVITY']);
        $activitiesDTO[] = $activityDTO;
      }
      return $activitiesDTO;
    }

    return null;
  }

  /**
   * @param $id_hobby
   * @return array|null
   */
  public function getHobbyActivities($id_hobby)
  {
    $stmt = $this->db->prepare("
        SELECT
            act.ID_ACTIVITY
         FROM
             activity act
        WHERE
            act.ID_HOBBY = ?
        ");// SQL request to get all the activities of a precise hobby
    $stmt->bind_param('i', $id_hobby);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
      $activitiesDTO = [];
      while ($row = $result->fetch_assoc()) {
        $activityDTO = $this->findActivityById($row['ID_ACTIVITY']);
        $activitiesDTO[] = $activityDTO;
      }
      return $activitiesDTO;
    }

    return null;



        $result = $stmt->get_result();

        if($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $userDTO = $this->userRepository->findUserById($row['ID_ACTIVITY_DIRECTOR']);
            $hobbyDTO = $this->hobbyRepository->findHobbyById($row['ID_HOBBY']);
            $organizationDTO = $this->organizationRepository->findOrganizationById($row['ID_ORGANIZATION']);

            return new ActivityDTO($row['ID_ACTIVITY'], $userDTO, $hobbyDTO, $row['ADVANCEMENT'], $row['DESCRIPTION'],
                                $row['DATE_POST'], $row['DATE_ACTIVITY'], $row['CURRENT_REGISTERED'], $row['MAX_REGISTRATIONS'], $row['IMAGE'], $row["TITLE"],$row['ID_ORGANIZATION'], $organizationDTO);
        }
        return null;
    }

  /**
   * @param $activityId
   * @return ActivityParticipantsDTO|null
   */
    public function getActivityParticipants($activityId) {
        $stmt = $this->db->prepare("

            SELECT
                par.ID_USER
            FROM
                activity act
            INNER JOIN activity_participants par
                ON act.ID_ACTIVITY = par.ID_ACTIVITY
            WHERE
                act.ID_ACTIVITY = ?
        ");

    $stmt->bind_param('i', $activityId);
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
      // find the activity details using its ID
      $activityDTO = $this->findActivityById($activityId);
      $usersDTO = [];
      while ($row = $result->fetch_assoc()) {
        // find each user's details by their ID
        $usersDTO[] = $this->userRepository->findUserById($row['ID_USER']);
      }
      return new ActivityParticipantsDTO($usersDTO, $activityDTO);
    }
      // return null if there are no participants found
    return null;
  }

  /**
   * @param $userId
   * @param $activityId
   * @return bool
   */
  public function registerUserToActivity($userId, $activityId)
  {
    $stmt = $this->db->prepare("
            INSERT INTO
                activity_participants (ID_USER, ID_ACTIVITY)
            VALUES
                (?, ?)
            ;
        ");

    $stmt->bind_param('ii', $userId, $activityId);
    $stmt->execute();

    if ($stmt->affected_rows > 0) { //if rows are affected it means the database has been modified
      return true;
    }
    return false;
  }

  /**
   * @param $userId
   * @param $activityId
   * @return bool
   */
  public function deleteUserFromActivity($userId, $activityId)
  {
    $stmt = $this->db->prepare("
            DELETE FROM
                activity_participants
            WHERE
                ID_USER = ?
                AND
                ID_ACTIVITY = ?;
            ;
        ");
    
    $stmt->bind_param('ii', $userId, $activityId);
    $stmt->execute();

    if ($stmt->affected_rows > 0) { //if rows are affected it means the database has been modified
      return true;
    }
    return false;
  }

  /**
   * @param $userId
   * @return int
   */
  public function getNumActivitiesDirector($userId): int
  {
    $stmt = $this->db->prepare("
            SELECT
                COUNT(*)
            FROM
                activity act
            WHERE
                act.ID_ACTIVITY_DIRECTOR = ?
            ;
        ");
    $stmt->bind_param('i', $userId);
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      return $row['COUNT(*)'];
    }
    return 0;
  }

  /**
   * @param $userId
   * @return int|mixed
   */
  public function getNumActivitiesClassical($userId)
  {
    $stmt = $this->db->prepare("
            SELECT
                COUNT(*)
            FROM
                activity_participants par
            WHERE
                par.ID_USER = ?
            ;
        ");
    $stmt->bind_param('i', $userId);
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      return $row['COUNT(*)'];
    }
    return 0;
  }

  /**
   * @param mixed $activityId
   * @return string
   */
  public function deleteActivity(mixed $activityId)
  {
    $stmt = $this->db->prepare("
        DELETE FROM
            activity
        WHERE
            activity.ID_ACTIVITY = ?
        ");

    $stmt->bind_param("i", $activityId);
    $stmt->execute();
    if ($stmt->affected_rows > 0) return "success";
    else return "failure";
  }
}

