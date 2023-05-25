<?php

require_once '../Database.php';
require_once '../DTOs/HobbyDTO.php';

class HobbyRepository
{
  private $db;
  private static $instance = null;

  public function __construct() {
    $this->db = Database::getInstance()->getConnection();
  }
  public static function getInstance() {
    if(!self::$instance) {
      self::$instance = new HobbyRepository();
    }
    return self::$instance;
  }

  public function findHobby(string $hobby) {
    $stmt = $this->db->prepare("SELECT * FROM hobby WHERE HOBBY_NAME LIKE CONCAT('%', ?, '%')");
    $stmt->bind_param("s", $hobby);

    $stmt->execute();

    $result = $stmt->get_result();

    if ($stmt->num_rows == 1) {
      $row = $result->fetch_assoc();
      $hobbyDTO = new HobbyDTO();
      $hobbyDTO->id = $row['ID'];
      $hobbyDTO->name = $row['HOBBY_NAME'];
      $hobbyDTO->image = $row['IMAGE'];

      return $hobby = array(
        'id' => $hobbyDTO->id,
        'name' => $hobbyDTO->name,
        'image' => $hobbyDTO->image
      );
    }
    else {
      return json_encode([]);
    }
  }
}
