<?php

require_once '../Database.php';
require_once '../DTOs/OrganizationDTO.php';

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

    echo json_encode($response);
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


    echo json_encode($response);
  }

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

    if($stmt->affected_rows > 0) {
      $organizationId = $stmt->insert_id;
      $this->modifiyActivityDirectorOrganization($userId, $organizationId);

      return true;
    }
    return false;
  }


  public function addActivityDirector($userId, $organizationId) {
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

  public function modifiyActivityDirectorOrganization($userId, $organizationId) {
    $stmt = $this->db->prepare("
        UPDATE
            activity_director act_d
        SET
            act_d.ID_ORGANIZATION = ?
        WHERE
            act_d.ID_USER = ?
        ;
      ");
    $stmt->bind_param("ii",  $organizationId, $userId);

    $stmt->execute();
  }

}
