<?php


require_once '../Database.php';
require_once '../DTOs/UserDTO.php';

class UserRepository {
    private $db;
    private static $instance = null;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    public static function getInstance() {
        if(!self::$instance) {
            self::$instance = new UserRepository();
        }
        return self::$instance;
    }

    /**
     * Method to register a user in the User database
     *
     * @param UserDTO $userDTO
     * @return void
     */
    public function registerUser(UserDTO $userDTO) {
        $name = $userDTO->name;
        $email = $userDTO->email;
        $pseudo = $userDTO->username;
        $password = $userDTO->password;

        $stmt = $this->db->prepare("INSERT INTO user (USER_NAME, USER_PSEUDO, USER_PASSWORD, EMAIL, AVATAR) VALUES (?, ?, ?, ?, null)");
        $stmt->bind_param("ssss", $name, $pseudo, $password, $email);

        $stmt->execute();
    }


    /**
     * Method to check if the data sent during the connection form correspond to a user in the database
     *
     * @param UserDTO $userDTO
     * @return false|string
     */
    public function loginUser(UserDTO $userDTO) {
        $username = $userDTO->username;
        $password = $userDTO->password;

        $stmt = $this->db->prepare("SELECT * FROM user WHERE USER_PSEUDO = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        // Vérification des informations d'identification
        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            $hashedPasswordFromDatabase = $row['USER_PASSWORD'];

            if (password_verify($password, $hashedPasswordFromDatabase)) {
                // Authentification réussie
                $response = array(
                    'success' => true,
                    'message' => 'Authentication successful',
                    'token' => 'fake_token'
                );
            } else {
                // Mot de passe incorrect
                $response = array(
                    'success' => false,
                    'message' => 'Invalid username or password'
                );
            }
        } else {
            // Utilisateur non trouvé
            $response = array(
                'success' => false,
                'message' => 'Invalid username or password'
            );
        }

        // Envoi de la réponse JSON
        return json_encode($response);
    }

    public function findUserById(int $id) {
        $stmt = $this->db->prepare("SELECT * FROM user WHERE ID_USER = ?");
        $stmt->bind_param("i", $id);

        $stmt->execute();
        $result = $stmt->get_result();

        if($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $user = new UserDTO($row['ID_USER'], $row['USER_NAME'], $row['USER_PSEUDO'], $row['USER_PASSWORD'], $row['EMAIL'], $row['AVATAR']);
            return $user;
        }

        return null;
    }

}
