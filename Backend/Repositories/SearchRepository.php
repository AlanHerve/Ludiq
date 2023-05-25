<?php


require_once '../Database.php';
require_once '../DTOs/HobbyDTO.php';
require_once '../DTOs/UserDTO.php';
require_once '../Repositories/UserRepository.php';

class SearchRepository
{
    private $db;
    private static $instance = null;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new SearchRepository();
        }
        return self::$instance;
    }

    public function searchHobbies(string $hobby)
    {
        $stmt = $this->db->prepare("SELECT * FROM hobby WHERE HOBBY_NAME LIKE CONCAT('%', ?, '%')");
        $stmt->bind_param("s", $hobby);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $hobbies = [];
            while ($row = $result->fetch_assoc()) {
                $hobbyDTO = new HobbyDTO();
                $hobbyDTO->id = $row['ID_HOBBY'];
                $hobbyDTO->name = $row['HOBBY_NAME'];
                $hobbyDTO->image = $row['IMAGE'];

                $hobbies[] = $hobbyDTO;
            }

            return json_encode($hobbies);
        } else {
            return json_encode([]);
        }
    }

    public function searchUsers(string $user)
    {
        if($user == '') return json_encode([]);
        $stmt = $this->db->prepare("SELECT * FROM user WHERE USER_NAME LIKE CONCAT('%', ?, '%')");
        $stmt->bind_param("s", $user);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $users = [];
            while ($row = $result->fetch_assoc()) {
                $userRepository = UserRepository::getInstance();
                $userDTO = $userRepository->findUserById($row['ID_USER']);
                if($userDTO != null){
                    $users[] = $userDTO;
                }
            }

            return json_encode($users);
        } else {
            return json_encode([]);
        }
    }
}