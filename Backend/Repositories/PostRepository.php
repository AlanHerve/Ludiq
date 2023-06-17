<?php

require_once '../Database.php';
require_once '../DTOs/PostDTO.php';
require_once '../DTOs/UserDTO.php';
require_once '../DTOs/HobbyDTO.php';
require_once '../Repositories/UserRepository.php';
require_once '../Repositories/HobbyRepository.php';
require_once '../Repositories/ImageRepository.php';

class PostRepository
{

  private static $instance = null;
  private $db;
  private $userRepository;
  private $hobbyRepository;
  private $imageRepository;

  public function __construct()
  {
    $this->db = Database::getInstance()->getConnection();
    $this->hobbyRepository = HobbyRepository::getInstance();
    $this->userRepository = UserRepository::getInstance();
    $this->imageRepository = ImageRepository::getInstance();
  }

  public static function getInstance()
  {
    if (!self::$instance) {
      self::$instance = new PostRepository();
    }
    return self::$instance;
  }

  public function newPost(PostDTO $regularPostDTO)
  {
    $id_user = $regularPostDTO->userDTO->id;
    $id_hobby = $regularPostDTO->hobbyDTO->id;
    $description = $regularPostDTO->description;
    $images = $regularPostDTO->images;
    $stmt = $this->db->prepare("INSERT INTO regular_post (ID_USER, ID_HOBBY, DESCRIPTION, IMAGE1, IMAGE2, IMAGE3, IMAGE4) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("iisssss", $id_user, $id_hobby, $description, $images[0], $images[1], $images[2], $images[3]);

    $stmt->execute();

    if ($stmt->affected_rows > 0) {
      return true;
    } else {
      return false;
    }
  }

  public function getUserPosts($id_user)
  {
    $stmt = $this->db->prepare("
            SELECT
                reg.ID_REGULAR_POST
            FROM
                regular_post reg
            WHERE
                reg.ID_USER = ?
            ORDER BY
                reg.TIME
            DESC
            ;
        ");
    $stmt->bind_param('i', $id_user);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
      $postsDTO = [];
      while ($row = $result->fetch_assoc()) {
        $postsDTO[] = $this->findPostById($row['ID_REGULAR_POST']);
      }
      return $postsDTO;
    }
    return [];
  }

  public function findPostById($id)
  {
    $stmt = $this->db->prepare("
        SELECT
            reg.*
            ,u.ID_USER
            ,hob.ID_HOBBY
        FROM
            regular_post reg
        INNER JOIN user u
            ON u.ID_USER = reg.ID_USER
        LEFT JOIN hobby hob
            ON hob.ID_HOBBY = reg.ID_HOBBY
        WHERE
            reg.ID_REGULAR_POST = ?
        ");

    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
      $row = $result->fetch_assoc();
      $images = [$row['IMAGE1'], $row['IMAGE2'], $row['IMAGE3'], $row['IMAGE4']];
      $userDTO = $this->userRepository->findUserById($row['ID_USER']);
      $hobbyDTO = $this->hobbyRepository->findHobbyById($row['ID_HOBBY']);
      return new PostDTO($row['ID_REGULAR_POST'], $userDTO, $hobbyDTO, $row['DESCRIPTION'],
        $images, $row['MODIFIED'], $row['LIKES'], $row['TIME']);
    }

    return null;
  }

  public function likePost($postId)
  {
    $stmt = $this->db->prepare("UPDATE regular_post SET LIKES = LIKES + 1 WHERE ID_REGULAR_POST = ?");
    $stmt->bind_param("i", $postId);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
      $response = array(
        'success' => true
      );
    } else {
      $response = array(
        'success' => false
      );
    }

    return json_encode($response);
  }

  public function unlikePost($postId)
  {
    $stmt = $this->db->prepare("UPDATE regular_post SET LIKES = LIKES - 1 WHERE ID_REGULAR_POST = ?");
    $stmt->bind_param("i", $postId);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
      $response = array(
        'success' => true
      );
    } else {
      $response = array(
        'success' => false
      );
    }

    return json_encode($response);
  }

  public function getAllPosts()
  {
    $stmt = $this->db->prepare("SELECT * FROM regular_post reg ORDER BY reg.TIME DESC");
    $stmt->execute();
    $result = $stmt->get_result();
    $postsDTO = [];
    if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc())
        $postsDTO[] = $this->findPostById($row['ID_REGULAR_POST']);
    }
    return $postsDTO;
  }

  public function getHobbyPosts($id_hobby)
  {
    $stmt = $this->db->prepare("
            SELECT
                *
            FROM
                regular_post reg
            WHERE
                reg.ID_HOBBY = ?
            ORDER BY
                reg.TIME
            DESC
            ;
        ");
    $stmt->bind_param('i', $id_hobby);
    $stmt->execute();
    $result = $stmt->get_result();
    $postsDTO = [];
    if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc())
        $postsDTO[] = $this->findPostById($row['ID_REGULAR_POST']);
    }
    return $postsDTO;
  }

  public function getNumPosts($id_user)
  {
    $stmt = $this->db->prepare("
            SELECT
                COUNT(*)    AS num_posts
            FROM
                regular_post reg
            WHERE
                reg.ID_USER = ?
            ;
        ");
    $stmt->bind_param("i", $id_user);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row['num_posts'];
  }

    public function deletePost($postId)
    {

      $stmt = $this->db->prepare("
          DELETE FROM
                regular_post
          WHERE
                regular_post.ID_REGULAR_POST = ?
      ");



      $stmt->bind_param("i", $postId);
      $stmt->execute();

      if($stmt->affected_rows == 1){
        return json_encode("success");
      }else{
        return json_encode("failure");
      }

    }
}

?>
