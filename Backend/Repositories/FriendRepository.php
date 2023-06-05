<?php

require_once '../Database.php';
require_once '../DTOs/UserDTO.php';
require_once '../Repositories/UserRepository.php';
class FriendRepository {
    private $db;
    private static $instance = null;
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository) {
        $this->db = Database::getInstance()->getConnection();
        $this->userRepository = $userRepository;
    }
    public static function getInstance() {
        if(!self::$instance) {
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
    public function getAllFriends(int $id_user) {
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
        if($result->num_rows > 0) {
            $usersDTO = [];
            while($row = $result->fetch_assoc()) {
                $usersDTO[] = $this->userRepository->findUserById($row['ID_USER_2']);
            }
            return json_encode($usersDTO);
        }
        return null;
    }

}