<?php
require_once '../Database.php';
require_once '../DTOs/CommentDTO.php';
require_once '../Repositories/UserRepository.php';


class CommentRepository
{
  private static $instance = null;
  private $db;
  private $userRepository;

  public function __construct()
  {
    $this->db = Database::getInstance()->getConnection();
    $this->userRepository = UserRepository::getInstance();
  }

  public static function getInstance()
  {
    if (!self::$instance) {
      self::$instance = new CommentRepository();
    }
    return self::$instance;
  }

  /**
   * post a new comment
   * @param $userDTO
   * @param $content
   * @param $id_regular_post
   * @return int|string
   */
  public function addComment($userDTO, $content, $id_regular_post)
  {
    $stmt = $this->db->prepare("INSERT INTO comment (ID_USER, CONTENT, ID_REGULAR_POST) VALUES (?, ?, ?)");
    $stmt->bind_param("isi", $userDTO['id'], $content, $id_regular_post);
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
      $index = $stmt->insert_id;
      $response = array('success' => true);
    } else {
      $index = -1;
      $response = array('success' => false);
    }
    return $index;
  }

  public function getComments($id_regular_post)
  {
    $stmt = $this->db->prepare("SELECT * FROM comment WHERE ID_REGULAR_POST = ?");
    $stmt->bind_param("i", $id_regular_post);
    $stmt->execute();
    $result = $stmt->get_result();
    $comments = [];
    while ($row = $result->fetch_assoc()) {
      $comments[] = $row;
    }
    return json_encode($comments);
  }

  public function updateComment($id_comment, $content)
  {
    $stmt = $this->db->prepare("UPDATE comment SET CONTENT = ? WHERE ID_COMMENT = ?");
    $stmt->bind_param("si", $content, $id_comment);
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
      $response = array('success' => true);
    } else {
      $response = array('success' => false);
    }
    return json_encode($response);
  }

  /**
   * delete a comment
   * @param $id_comment
   * @return string
   */
  public function deleteComment($id_comment)
  {
    $stmt = $this->db->prepare("DELETE FROM comment WHERE ID_COMMENT = ?");
    $stmt->bind_param("i", $id_comment);
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
      return "success";
    } else {
      return "failure";
    }
  }

  public function getAllComments($postID)
  {
    $stmt = $this->db->prepare("
        SELECT
            *
        FROM
            comment com
        WHERE
            com.ID_REGULAR_POST = ?
        ;
    ");
    $stmt->bind_param('i', $postID);
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
      $commentsDTO = [];
      while ($row = $result->fetch_assoc()) {
        $userDTO = $this->userRepository->findUserById($row['ID_USER']);
        $commentsDTO[] = new CommentDTO($row['ID_COMMENT'], $userDTO, $row['CONTENT'], $row['ID_REGULAR_POST'], $row['TIME']);
      }
      return $commentsDTO;
    }
    return null;
  }

  /**
   * get three comments of a post, used when a user is not on a post's detailed page
   * @param $postID
   * @return array|null
   */
  public function getThreeComments($postID)
  {
    $stmt = $this->db->prepare("
            SELECT
                *
            FROM
                comment com
            WHERE
                com.ID_REGULAR_POST = ?
            ORDER BY
                1
            DESC
            LIMIT 3
            ;
     ");
    $stmt->bind_param('i', $postID);
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
      $commentsDTO = [];
      while ($row = $result->fetch_assoc()) {
        $userDTO = $this->userRepository->findUserById($row['ID_USER']);
        $commentsDTO[] = new CommentDTO($row['ID_COMMENT'], $userDTO, $row['CONTENT'], $row['ID_REGULAR_POST'], $row['TIME']);
      }
      return $commentsDTO;
    }
    return null;
  }


}
?>
