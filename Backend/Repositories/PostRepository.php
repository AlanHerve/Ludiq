<?php

require_once '../Database.php';
require_once '../DTOs/PostDTO.php';
class PostRepository{
  private $db;
  private static $instance = null;

  public function __construct() {
    $this->db = Database::getInstance()->getConnection();
  }

  public function newPost(PostDTO $postDTO){
    $id_user = 3;
    $id_hobby = 1;
    $description = $postDTO->description;
    $images = $postDTO->images;
    $stmt = $this->db->prepare("INSERT INTO regular_post (ID_USER, DESCRIPTION, IMAGE1, IMAGE2, IMAGE3, IMAGE4) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssss", $id_user, $description, $images[0], $images[1], $images[2], $images[3]);

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

  public function getAllPosts() {
    $stmt = $this->db->prepare("SELECT * FROM regular_post reg");
    $stmt->execute();

    $result = $stmt->get_result();
    $postsDTO = [];
    while($row = $result->fetch_assoc()) {
      $str_images = [$row['IMAGE1'],$row['IMAGE2'],$row['IMAGE3'],$row['IMAGE4']];
      //$images = $this->findImagesOnLocalStorage($str_images);
      $postDTO = new PostDTO($row['ID_REGULAR_POST'], $row['ID_USER'], 0, $row['DESCRIPTION'], $str_images, $row['MODIFIED'], $row['LIKES'], $row['TIME']);
      $postsDTO[] = $postDTO;
    }

    return json_encode($postsDTO);
  }

  private function findImagesOnLocalStorage($strings)
  {
    $files = [];
    foreach($strings as $string) {
      $file = '../assets/images/'.$string;
      if(file_exists($file)) {
        $fileContent = file_get_contents($file);

        $files[] = $fileContent;
      }
    }
    return $files;
  }

  public function getPosts($mode, PostDTO $postDTO){

    if ($mode == "user_page"){
      return json_encode("poney");
      $id_user = $postDTO->id_user;

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
            'posts'   => $arrayPost
          );
        }

      }else{
        $response = array(
          'success' => false
        );
      }
    }
    return json_encode($response);
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
