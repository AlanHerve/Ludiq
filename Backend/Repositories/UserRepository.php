<?php


require_once '../Database.php';
require_once '../DTOs/UserDTO.php';

class UserRepository {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public function registerUser(UserDTO $userDTO) {
        $name = $userDTO->name;
        $email = $userDTO->email;
        $pseudo = $userDTO->username;
        $password = $userDTO->password;

        $stmt = $this->db->prepare("INSERT INTO user (USER_NAME, USER_PSEUDO, USER_PASSWORD, EMAIL, AVATAR) VALUES (?, ?, ?, ?, null)");
        $stmt->bind_param("ssss", $name, $pseudo, $password, $email);

        return $stmt->execute();
    }

}
