<?php

require_once '../Database.php';
require_once '../DTOs/UserDTO.php';
require_once '../Repositories/UserRepository.php';
require_once '../DTOs/FriendRequestDTO.php';
class FriendRepository
{
    private $db;
    private static $instance = null;

    //to call fonctions regarding users
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->db = Database::getInstance()->getConnection();
        $this->userRepository = $userRepository;
    }

    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new FriendRepository(UserRepository::getInstance());
        }
        return self::$instance;
    }

    /**
     * Method that find all the friends of a user, according to its ID
     *
     * @param int $id_user
     */
    public function getAllFriends(int $id_user)
    {
        $stmt = $this->db->prepare("
            SELECT
                fri.ID_USER_2
                , fri.ID_USER
                , fri.WAITING
            FROM
                friends fri
            WHERE
                fri.ID_USER = ?
                OR
                fri.ID_USER_2 = ?
            ;
        ");
        $stmt->bind_param("ii", $id_user, $id_user);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $usersDTO = [];
            while ($row = $result->fetch_assoc()) {
              //if $row['ID_USER_2']!=$id_user then the user is the one who has sent the friend request
              // waiting=1 is other user has not accepted the friendship request
                if($row['ID_USER_2']!=$id_user)
                $usersDTO[] = new FriendRequestDTO($this->userRepository->findUserById($row['ID_USER_2']), $row["WAITING"], $row['ID_USER']);
                else $usersDTO[] = new FriendRequestDTO($this->userRepository->findUserById($row['ID_USER']), $row["WAITING"], $row['ID_USER']);
            }
            return $usersDTO;
        }
        return null;
    }

    public function getNumFriends($id_user): int
    {
        $stmt = $this->db->prepare("
            SELECT
                COUNT(*)    AS  num_friends
            FROM
                friends fri
            WHERE
                fri.ID_USER = ?
            AND
                fri.WAITING = 0
            ;
        ");
        $stmt->bind_param("i", $id_user);
        $stmt->execute();
        $result = $stmt->get_result();
        if($result->num_rows > 0) {
          $row = $result->fetch_assoc();
          return $row['num_friends'];
        }
        return 0;
    }

    public function isFriendWith($user1, $user2) {
        $stmt = $this->db->prepare("
            SELECT
                fri.*
            FROM
                friends fri
            WHERE
                (
                    fri.ID_USER = ? AND fri.ID_USER_2 = ?
                    OR
                    fri.ID_USER = ? AND fri.ID_USER_2 = ?
                )
            ;
        ");
        $stmt->bind_param("iiii", $user1, $user2, $user2, $user1);
        $stmt->execute();
        $result = $stmt->get_result();
        if($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if($row["WAITING"] == 1) return "waiting";
            else return "friend";
        }
        return "!friend";
    }

    public function removeFriend($id_user1, $id_user2)
    {
        $stmt = $this->db->prepare("
        DELETE
            fri
        FROM
            friends AS fri
        WHERE
            (
                    fri.ID_USER = ? AND fri.ID_USER_2 = ?
                    OR
                    fri.ID_USER = ? AND fri.ID_USER_2 = ?
            )
        ");

        $stmt->bind_param("iiii", $id_user1, $id_user2, $id_user2, $id_user1);
        $stmt->execute();

        if($stmt->affected_rows == 1) return "success";
        else return "failure";
    }

    public function addFriend($id_user1, $id_user2)
    {

        $stmt = $this->db->prepare("
        INSERT INTO friends
            (ID_USER, ID_USER_2, WAITING)
        VALUES
            (?, ?, 1)
        ");
        $stmt->bind_param("ii", $id_user1, $id_user2);
        $stmt->execute();

        if($stmt->affected_rows == 1) return "friend";
        else return "phoeey";
    }

    public function getWaiting($id_user)
    {
        $response = null;
        $stmt = $this->db->prepare("
        SELECT
            *
        FROM
            friends fri
        WHERE
            fri.WAITING = true
        ");

        $stmt->execute();
        $result = $stmt->get_result();

        $users_with_waiting_requests = [];

        if($result){
            while ($row = $result->fetch_assoc()){
                $stmt->prepare("
                SELECT
                    *
                FROM
                    user use
                WHERE
                    use.ID_USER = ?
                ");
                $stmt->bind_param("i", $row["ID_USER"]);
                $stmt->execute();

                if($stmt->num_rows == 1){
                    $result_sub = $stmt->get_result()->fetch_assoc();

                    array_push($users_with_waiting_requests, new UserDTO($result_sub["ID_USER"], $result_sub["USER_NAME"], $result_sub["USER_PSEUDO"], null, null, $result_sub["AVATAR"], null));
                }
            }
        }

        return $response;
    }

    public function acceptFriendship($id_user_1, $id_user_2){
        $stmt = $this->db->prepare("
        UPDATE
            friends fri
        SET
            fri.WAITING = 0
        WHERE
            fri.ID_USER = ?
            AND
            fri.ID_USER_2 = ?
        ");
        $stmt->bind_param("ii", $id_user_1, $id_user_2);
        $stmt->execute();

        if($stmt->affected_rows == 1){
            return "success";
        }

        return "failure";

    }

    public function acceptedFriendship($userId, $friendId) {
        $stmt = $this->db->prepare("
            SELECT
                *
            FROM
                friends fri
            WHERE
                (
                    (fri.ID_USER = ?
                    AND
                    fri.ID_USER_2 = ?)
                    OR
                    (fri.ID_USER = ?
                    AND
                    fri.ID_USER_2 = ?)
                )
                AND
                fri.WAITING = 0
            ;
        ");
        $stmt->bind_param("iiii", $userId, $friendId, $friendId, $userId);
        $stmt->execute();

        if($stmt->get_result()->num_rows == 1){
            return true;
        }

        return false;
    }

}
