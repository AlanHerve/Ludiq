<?php

require_once '../Database.php';
require_once '../DTOs/RegularPostDTO.php';
class RegularPostRepository{

  private $db;

  private static $instance = null;

  public function __construct() {
    $this->db = Database::getInstance()->getConnection();
  }

  public function newRegularPost(RegularPostDTO $regularPostDTO){
    $id_user = 3;
    $id_hobby = 1;
    $description = $regularPostDTO->description;
    $images = $regularPostDTO->images;
    $stmt = $this->db->prepare("INSERT INTO regular_post (ID_USER, ID_HOBBY, DESCRIPTION, IMAGE1, IMAGE2, IMAGE3, IMAGE4) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("iisssss", $id_user, $id_hobby, $description, $images[0], $images[1], $images[2], $images[3]);

    $stmt->execute();

    if($stmt->affected_rows > 0){
      $response = array(
        'success' => 'true'
      );
    }else{
      $response = array(
        'success' => 'false'
      );
    }

    return json_encode($response);
  }

  public function getPosts($mode, RegularPostDTO $regularPostDTO){
    $result = null;
    $arrayPost = [];
    $success = false;
    $content = 0;

    if($mode == "search"){



    }elseif ($mode == "userPage"){



      $id_user = $regularPostDTO->id_user;

      $stmt = $this->db->prepare("SELECT * FROM regular_post reg WHERE reg.ID_USER=?");
      $stmt->bind_param("s", $id_user);
      $stmt->execute();

      $result = $stmt->get_result();
      if($result){
        $success = true;
        while ($row = $result->fetch_assoc()){
          $content++;
          array_push($arrayPost, $row);
        }
      }
      if($success){

        if($content == 0){
          $response = array(
            'success' => true,
            'content' => "empty"
          );
        }else{
          $response = array(
            'success' => true,
            'content' => "some",
            'posts'   => $arrayPost
          );
        }

      }else{
        $reponse = array(
          'success' => false
        );
      }



    }

  }

  public function getSinglePost($id){

  }

  public static function getInstance() {
    if(!self::$instance) {
      self::$instance = new RegularPostRepository();
    }
    return self::$instance;
  }

}

?>
