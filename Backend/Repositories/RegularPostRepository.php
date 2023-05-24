<?php

class RegularPostRepository{

  private $db;

  private static $instance = null;

  public function __construct() {
    $this->db = Database::getInstance()->getConnection();
  }

  public function newRegularPost(RegularPostDTO $regularPostDTO){
    $id_user = $regularPostDTO->id_user;
    $id_hobby = $regularPostDTO->id_hobby;
    $description = $regularPostDTO->description;
    $images = $regularPostDTO->images;



    $stmt = $this->db->prepare("INSERT INTO user (ID_USER, ID_HOBBY, DESCRIPTION, IMAGE1, IMAGE2, IMAGE3, IMAGE4) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $id_user, $id_hobby, $description, $images[0], $images[1], $images[2], $images[3]);

    $stmt->execute();
  }

  public static function getInstance() {
    if(!self::$instance) {
      self::$instance = new RegularPostRepository();
    }
    return self::$instance;
  }

}

?>
