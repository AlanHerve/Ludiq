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


  //private $OrganizationRepository;


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
  {

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
        ");
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
      $activitiesDTO = [];
      while ($row = $result->fetch_assoc()) {
        $activityDTO = $this->findActivityById($row['ID_ACTIVITY']);
        if ($activityDTO)
          $activitiesDTO[] = $activityDTO;
      }
      return $activitiesDTO;
    }
    return null;
  }

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
    ");

    $stmt->bind_param('i', $id_activity);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
      $row = $result->fetch_assoc();
      $userDTO = $this->userRepository->findUserById($row['ID_ACTIVITY_DIRECTOR']);
      $hobbyDTO = $this->hobbyRepository->findHobbyById($row['ID_HOBBY']);

      return new ActivityDTO($row['ID_ACTIVITY'], $userDTO, $hobbyDTO, $row['ADVANCEMENT'], $row['DESCRIPTION'],
        $row['DATE_POST'], $row['DATE_ACTIVITY'], $row['participant_count'], $row['MAX_REGISTRATIONS'],
        $row['IMAGE'], $row["TITLE"], $row['ID_ORGANIZATION'], $row['NAME_ORGANIZATION']);
    }
    return null;
  }

  public function getUserActivities($id_user)
  {
    $stmt = $this->db->prepare("
            SELECT
                act.ID_ACTIVITY
            FROM
                user u
            INNER JOIN activity act
                ON act.ID_ACTIVITY_DIRECTOR = u.ID_USER
            INNER JOIN activity_participants par
                ON act.ID_ACTIVITY = par.ID_ACTIVITY
            WHERE
                act.ID_ACTIVITY_DIRECTOR = ?
                OR
                par.ID_USER = ?
            ;
        ");
    $stmt->bind_param('ii', $id_user, $id_user);
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

  public function getHobbyActivities($id_hobby)
  {
    $stmt = $this->db->prepare("
        SELECT
            act.ID_ACTIVITY
         FROM
             activity act
        WHERE
            act.ID_HOBBY = ?
        ");
    $stmt->bind_param('i', $id_hobby);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) { //normalement la même que getAllActivities
      $activitiesDTO = [];
      while ($row = $result->fetch_assoc()) {
        $activityDTO = $this->findActivityById($row['ID_ACTIVITY']);
        $activitiesDTO[] = $activityDTO;
      }
      return $activitiesDTO;
    }
  }


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
      $activityDTO = $this->findActivityById($activityId);
      $usersDTO = [];
      while ($row = $result->fetch_assoc()) {
        $usersDTO[] = $this->userRepository->findUserById($row['ID_USER']);
      }
      return new ActivityParticipantsDTO($usersDTO, $activityDTO);
    }

    return null;
  }

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

  public function deleteActivity($activityId)
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

