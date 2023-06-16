<?php
require_once '../Database.php';

class CommentRepository
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
            self::$instance = new CommentRepository();
        }
        return self::$instance;
    }

    public function addComment($userId, $content, $id_regular_post)
    {
        $stmt = $this->db->prepare("INSERT INTO comment (ID_USER, CONTENT, ID_REGULAR_POST) VALUES (?, ?, ?)");
        $stmt->bind_param("isi", $userId, $content, $id_regular_post);
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
        return json_encode($response);
    }

    public function getAllComments($postID)
    {
        $stmt = $this->db->prepare("
            SELECT
                *
            FROM
                comment com
            INNER JOIN regular_post pos
                ON pos.ID_REGULAR_POST = com.ID_REGULAR_POST
            WHERE
                pos.ID_REGULAR_POST = ?
        ");
        $stmt->bind_param('i', $postID);
        $stmt->execute();
    }

}

?>
