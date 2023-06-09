<?php

require_once '../Database.php';
require_once '../DTOs/MessageDTO.php';

class MessageRepository
{
    private $db;
    private static $instance = null;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    public static function getInstance() {
        if(!self::$instance) {
            self::$instance = new MessageRepository();
        }
        return self::$instance;
    }
    public function getMessageByUser(int $id_user) {

    }

    public function getMessagesBetweenUsers(int $id_user1, int $id_user2) {
        $stmt = $this->db->prepare("
        SELECT
            mes.*
        FROM
            message mes
        WHERE
            (mes.ID_USER = ? AND mes.ID_USER_2 = ?)
            OR 
            (mes.ID_USER = ? AND mes.ID_USER_2 = ?)
        ORDER BY
            mes.TIME ASC;
        ");
        $stmt->bind_param("iiii", $id_user1, $id_user2, $id_user2, $id_user1);
        $stmt->execute();
        $result = $stmt->get_result();
        $messagesDTO = [];
        while ($row = $result->fetch_assoc()) {
            $messageDTO = new MessageDTO($row['ID_MESSAGE'], $row['ID_USER'], $row['ID_USER_2'], $row['CONTENT'], $row['TIME']);
            $messagesDTO[] = $messageDTO;
        }
        return $messagesDTO;
    }

    public function createMessage(MessageDTO $messageDTO) {
        try {
            $stmt = $this->db->prepare("
            INSERT INTO
                message (ID_USER, ID_USER_2, CONTENT)
            VALUES
                (?, ?, ?)
            ;
        ");
            $stmt->bind_param("iis", $messageDTO->id_user, $messageDTO->id_user2, $messageDTO->content);
            $stmt->execute();
            $stmt->close();

            return json_encode(['status' => 'success']);
        } catch (Exception $e) {
            return json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }


    public function deleteMessag(int $message_id) {

    }
}