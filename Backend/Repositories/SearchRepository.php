<?php


require_once '../Database.php';
require_once '../DTOs/HobbyDTO.php';
require_once '../DTOs/UserDTO.php';
require_once '../Repositories/UserRepository.php';
require_once '../Repositories/PostRepository.php';
require_once '../Repositories/HobbyRepository.php';

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
        $stmt = $this->db->prepare("
            SELECT
                *
            FROM
                hobby h
            WHERE
                h.HOBBY_NAME
                LIKE
                    CONCAT('%', ?, '%')
            ORDER BY
                HOBBY_NAME
            ASC
        ");
        $stmt->bind_param("s", $hobby);

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $hobbies = [];
            while ($row = $result->fetch_assoc()) {
                $hobbyDTO = new HobbyDTO($row['ID_HOBBY'], $row['HOBBY_NAME'], $row['IMAGE']);

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
        $stmt = $this->db->prepare("
            SELECT
                *
            FROM
                user u
            WHERE
                u.USER_NAME
            LIKE
                CONCAT('%', ?, '%')
            OR 
                u.USER_PSEUDO
            LIKE
                CONCAT('%', ?, '%')
        ");
        $stmt->bind_param("ss", $user, $user);

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

    public function searchPost(string $content) {
        $stmt = $this->db->prepare("
            SELECT
                *
            FROM
                regular_post reg
            WHERE
                reg.DESCRIPTION
            LIKE
                CONCAT('%', ?, '%')
            ORDER BY
                reg.TIME
            DESC
        ");
        $stmt->bind_param("s", $content);

        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $posts = [];
            while ($row = $result->fetch_assoc()) {
                $postRepository = PostRepository::getInstance();
                $postDTO = $postRepository->findPostByID($row['ID_REGULAR_POST']);
                if($postDTO != null) {
                    $posts[] = $postDTO;
                }
            }
            return json_encode($posts);
        } else {
            return json_encode([]);
        }
    }
}