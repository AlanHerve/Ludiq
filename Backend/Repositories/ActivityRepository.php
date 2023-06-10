<?php
require_once '../Database.php';
require_once '../DTOs/ActivityDTO.php';
class ActivityRepository
{
  private $db;
  private static $instance = null;
  private $userRepository;
  private $hobbyRepository;
  private $OrganizationRepository;

  public function __construct()
  {
    // Assign the database connection to the $db variable
    $this->db = Database::getInstance()->getConnection();

    // Initialize other repositories
    $this->hobbyRepository = HobbyRepository::getInstance();
    $this->userRepository = UserRepository::getInstance();
    $this->OrganizationRepository = OrganizationRepository::getInstance();
  }

  // method to get an instance of ActivityRepository
  public static function getInstance()
  {
    console.log("create an instance");
    if (!self::$instance) { //if the instance doesn't exist then create a new one
      self::$instance = new ActivityRepository();
    }
    return self::$instance; //return the instance
  }

  public function newActivity(ActivityDTO  $activityDTO)
  {
    $id_user = $activityDTO->userDTO->id ;
    $id_hobby = $activityDTO->hobbyDTO->id ;
    $description = $activityDTO->description;
    $images = $activityDTO->images;
    console.log("avant la requete");
    $stmt = $this->db->prepare("INSERT INTO activity (ID_ACTIVITY_DIRECTOR, ID_HOBBY, DESCRIPTION , DATE_ACTIVITY , MAX_REGISTRATIONS, IMAGES) VALUES (?, ?, ?, ?, ?, ?)");
    console.log($stmt);
    $stmt->bind_param("iissis", $id_activity_director, $id_hobby, $description, $time, $max_registrations, $images);
    $stmt->execute();

    if ($stmt->affected_rows > 0) { //if rows are affected it means the database has been modified
      $response = array(
        'success' => 'true'
      );
    } else { //if not, nothing has been added in the database, therefore there is a problem somewhere
      $response = array(
        'success' => 'false'
      );
    }

    return json_encode($response);
  }
}
