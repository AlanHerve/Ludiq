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


  /**
   * get all messages between two users
   * the dinstinction between the two users will be done in the front end
   * @param int $id_user1
   * @param int $id_user2
   * @return array: all messages
   */
    public function getMessagesBetweenUsers(int $id_user1, int $id_user2) {
      //it does not matter who was the sender and who was the receiver
        $stmt = $this->db->prepare("
        SELECT
            mes.*
        FROM
            message mes
        WHERE
            (mes.ID_USER = ? AND mes.ID_USER_2 = ?)
            OR
            (mes.ID_USER = ? AND mes.ID_USER_2 = ?)
        ");
        $stmt->bind_param("iiii", $id_user1, $id_user2, $id_user2, $id_user1);
        $stmt->execute();
        $result = $stmt->get_result();
        $messagesDTO = [];
        //as long as the there are messages not added to $messagesDTO
        while ($row = $result->fetch_assoc()) {
            $messageDTO = new MessageDTO($row['ID_MESSAGE'], $row['ID_USER'], $row['ID_USER_2'], $row['CONTENT'], $row['TIME']);
            $messagesDTO[] = $messageDTO;
        }
        return $messagesDTO;
    }

  /**
   * post a new message
   * @param MessageDTO $messageDTO
   * @return false|string
   */
    public function createMessage(MessageDTO $messageDTO) {
        try {
          //ID_USER is the id of the sender, ID_USER_2 is the id of the receiver
            $stmt = $this->db->prepare("
            INSERT INTO
                message (ID_USER, ID_USER_2, CONTENT)
            VALUES
                (?, ?, ?)
            ;
        ");
            $stmt->bind_param("iis", $messageDTO->id_user, $messageDTO->id_user2, $messageDTO->content);
            $stmt->execute();
            $inserted = $stmt->insert_id;
            $stmt->close();

            $messageDTO->insertIDMessage($inserted);
            return json_encode($messageDTO);
        } catch (Exception $e) {
            return json_encode(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

  /**
   * delete a message using its id
   * @param int $message_id
   * @return false|string
   */
    public function deleteMessage(int $message_id) {
      $stmt = $this->db->prepare("
      DELETE FROM
         message
        WHERE
            ID_MESSAGE = ?
      ");
      $stmt->bind_param("i", $message_id);
      $stmt->execute();

      //if one row was affected, deletion was a success
      if ($stmt->affected_rows == 1){
        return json_encode($message_id);
      }else {
        return json_encode(-1);
      }

    }
}
