<?php

require_once '../Database.php';
require_once '../DTOs/UserDTO.php';
require_once '../Repositories/UserRepository.php';

class FriendRepository
{
    private $db;
    private static $instance = null;
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
     * @return false|string
     */
    public function getAllFriends(int $id_user)
    {
        $stmt = $this->db->prepare("
            SELECT
                fri.ID_USER_2
            FROM
                friends fri
            WHERE
                fri.ID_USER = ?
            ;
        ");
        $stmt->bind_param("i", $id_user);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $usersDTO = [];
            while ($row = $result->fetch_assoc()) {
                $usersDTO[] = $this->userRepository->findUserById($row['ID_USER_2']);
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
            ;
        ");
        $stmt->bind_param("i", $id_user);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row['num_friends'];
    }

    public function isFriendWidth($user1, $user2) {
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
        if($result->num_rows == 1) {
            return true;
        }
        return false;
    }

}