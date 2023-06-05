<?php

require_once '../Database.php';
require_once '../DTOs/PostDTO.php';
class PostRepository{

  private $db;

  private static $instance = null;

  public function __construct() {
    $this->db = Database::getInstance()->getConnection();
  }

  public function newPost(PostDTO $regularPostDTO){
    $id_user = $regularPostDTO->id_user;
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

  private function findPostById($id) {
    $stmt = $this->db->prepare("
        SELECT
            reg.*
            ,u.USER_NAME
            ,u.USER_PSEUDO
            ,u.AVATAR
        FROM
            regular_post reg
        INNER JOIN user u
            ON u.ID_USER = reg.ID_USER
        WHERE
            reg.ID_REGULAR_POST = ?
    ");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();

    if($result->num_rows == 1) {
      $row = $result->fetch_assoc();
      $images = [$row['IMAGE1'], $row['IMAGE2'], $row['IMAGE3'], $row['IMAGE4']];
      return new PostDTO($row['ID_REGULAR_POST'], $row['USER_NAME'], $row['USER_PSEUDO'], $row['ID_USER'], null, $row['DESCRIPTION'],
      $images, $row['MODIFIED'], $row['LIKES'], $row['TIME']);
    }
  }

  public function getAllPosts() {
    $stmt = $this->db->prepare("SELECT * FROM regular_post reg");
    $stmt->execute();
    $result = $stmt->get_result();
    $postsDTO = [];
    if($result->num_rows > 0) {
      while($row = $result->fetch_assoc())
        $postsDTO[] = $this->findPostById($row['ID_REGULAR_POST']);
    }
    return json_encode($postsDTO);
  }
  public function getPosts($mode, PostDTO $regularPostDTO){
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
      self::$instance = new PostRepository();
    }
    return self::$instance;
  }

}

?>
