<?php

require_once '../Database.php';
require_once '../DTOs/OrganizationDTO.php';
require_once '../Repositories/PostRepository.php';
require_once '../Repositories/ActivityRepository.php';
class OrganizationRepository
{

  private static $instance = null;
  private $db;
  private $postRepository;
  private $activityRepository;

  public function __construct()
  {
    $this->db = Database::getInstance()->getConnection();
    $this->postRepository = PostRepository::getInstance();
    $this->activityRepository = ActivityRepository::getInstance();
  }

  public static function getInstance()
  {
    if (!self::$instance) {
      self::$instance = new OrganizationRepository();
    }
    return self::$instance;
  }

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

    return $response;
  }

  public function fetchOrganizationActivities($id_organization){
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
        $activityDTO[] = $this->activityRepository->findActivityById($row['ID_ACTIVITY']);
      }
      return $activityDTO;
    }
  }
  public function fetchOrganizationPosts($id_organization)
  {
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
        $postsDTO[] = $this->postRepository->findPostById($row['ID_REGULAR_POST']);
      }
      return $postsDTO;
    }

    return [];
  }


  public function findOrganizationById($id_organization)
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
        return new OrganizationDTO($row["ID_ORGANIZATION"], $row["NAME_ORGANIZATION"], $row["AVATAR"], $row["DESCRIPTION"]);
      }
    }
    return null;
  }

}
