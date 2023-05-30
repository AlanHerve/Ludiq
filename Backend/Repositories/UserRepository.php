<?php


require_once '../Database.php';
require_once '../DTOs/UserDTO.php';

class UserRepository
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
    public function registerUser(UserDTO $userDTO)
    {
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
    public function loginUser(UserDTO $userDTO)
    {
        $username = $userDTO->username;
        $password = $userDTO->password;



        $stmt = $this->db->prepare("SELECT
	user.*
    , organization.ID_ORGANIZATION
    , organization.NAME_ORGANIZATION
FROM	
	user
    LEFT OUTER JOIN organization ON organization.ID_ORGANIZATION = 
    	(
        	SELECT 
        		activity_director.ID_ORGANIZATION 
            FROM 
            	activity_director
        		INNER JOIN 
        			user ON user.ID_USER = activity_director.ID_USER
            WHERE 
            	user.USER_NAME = ?
    	)
WHERE
	user.USER_NAME = ?;
");

        $stmt->bind_param("ss", $username, $username);
        $stmt->execute();

        $result = $stmt->get_result();
        if($result){


            // Vérification des informations d'identification
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $hashedPasswordFromDatabase = $row['USER_PASSWORD'];

                if (password_verify($password, $hashedPasswordFromDatabase)) {
                    // Authentification réussie

                    $token = 'fake_token';

                    //password_verify($password, $hashedPasswordFromDatabase)
                    if(isset($row["ID_ORGANIZATION"]) && isset($row["NAME_ORGANIZATION"])){
                        $token = $token."_".$row["ID_ORGANIZATION"]."_".$row["NAME_ORGANIZATION"];
                    }


                    $response = array(
                        'success' => true,
                        'message' => 'Authentication successful',
                        'token' => $token,
                        'id' => $row["ID_USER"],
                    );
                }else {
                    // Mot de passe incorrect
                    $response = array(
                        'success' => false,
                        'message' => 'Invalid username or password',
                        'passwd' => $row["USER_PASSWORD"],
                        'conversion' => $password,
                        'true' => password_verify($password, $hashedPasswordFromDatabase)
                    );
                }


            } else {
                // Utilisateur non trouvé
                $response = array(
                    'success' => false,
                    'message' => 'Invalid username or password',
                    'sat' => $stmt->error
                );
            }
        }else{
            $response = array(
                'success' => false,
                'message' => 'could not access bdd info'
            );
        }


        // Envoi de la réponse JSON
        return json_encode($response);
    }

    public function findUserById(int $id)
    {
        $stmt = $this->db->prepare("SELECT * FROM user WHERE ID_USER = ?");
        $stmt->bind_param("i", $id);

        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $user = new UserDTO($row['ID_USER'], $row['USER_NAME'], $row['USER_PSEUDO'], $row['USER_PASSWORD'], $row['EMAIL'], $row['AVATAR']);
            return $user;
        }

        return null;
    }

}
