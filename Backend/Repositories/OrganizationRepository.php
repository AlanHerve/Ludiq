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

    if ($stmt->affected_rows > 0) {
      $organizationId = $stmt->insert_id;
      $this->modifiyActivityDirectorOrganization($userId, $organizationId);

      return true;
    }
    return false;
  }

  public function modifiyActivityDirectorOrganization($userId, $organizationId)
  {
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
      $stmt = $this->db->prepare("
        INSERT INTO
            activity_director (ID_ORGANIZATION, ID_USER)
        VALUES
            (?, ?)
      ");
    } else {
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

    if($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      return new OrganizationDTO($row['ID_ORGANIZATION'],$row['NAME_ORGANIZATION'], $row['AVATAR'], $row['DESCRIPTION']);
    }
    return null;
  }

  public function sendInvitation($organizationId, $userId)
  {
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
    if($result->num_rows > 0) {
      return false;
    }

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
    if($result->num_rows > 0) {
      return true;
    }

    return false;
  }

  public function removeInvitation($organizationId, $userId)
  {

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
    if($result->num_rows == 0) {
      return false;
    }
    
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



}
