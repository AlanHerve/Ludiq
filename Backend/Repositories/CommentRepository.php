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

  public function addComment($id_user, $content, $id_regular_post)
  {
    $stmt = $this->db->prepare("INSERT INTO comment (ID_USER, CONTENT, ID_REGULAR_POST) VALUES (?, ?, ?)");
    $stmt->bind_param("isi", $id_user, $content, $id_regular_post);
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
      $response = array('success' => true);
    } else {
      $response = array('success' => false);
    }
    return $response;
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

  public function deleteComment($id_comment)
  {
    $stmt = $this->db->prepare("DELETE FROM comment WHERE ID_COMMENT = ?");
    $stmt->bind_param("i", $id_comment);
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
      $response = array('success' => true);
    } else {
      $response = array('success' => false);
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
                com.TIME
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
