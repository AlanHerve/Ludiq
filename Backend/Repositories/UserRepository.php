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


        /**
         * If user exists, will return their info
         * Will also return the id and name of their organization if they belong to one
         * If they are part of an organization then they are an activity director for that organization
         */
        $stmt = $this->db->prepare("
            SELECT
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
                            user.USER_PSEUDO = ?
                            OR
                            user.EMAIL = ?
                    )
            WHERE
                user.USER_PSEUDO = ?
                OR 
                user.EMAIL = ?
            ;
        ");

        $stmt->bind_param("ssss", $username, $username, $username, $username);
        $stmt->execute();

        $result = $stmt->get_result();
        if($result){


            // If user exists, verify user infos
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                //get the password from the database
                $hashedPasswordFromDatabase = $row['USER_PASSWORD'];

                /*
                 * password_verify will compare the password from the database with the password the user entered
                 * password_verify does not require any action regarding the hashing of both passwords
                 */
                if (password_verify($password, $hashedPasswordFromDatabase)) {
                    // Authentification réussie

                    $token = 'fake_token';

                    //password_verify($password, $hashedPasswordFromDatabase)
                    if(isset($row["ID_ORGANIZATION"]) && isset($row["NAME_ORGANIZATION"])){
                        $token = $token."_".$row["ID_ORGANIZATION"]."_".$row["NAME_ORGANIZATION"];
                    }
                    $userDTO = $this->findUserById($row['ID_USER']);
                    $userDTO->token = $token;
                    $response = array(
                        'success' => true,
                        'message' => 'Authentication successful',
                        'user' => $userDTO
                    );
                }else {
                    // Incorrect password
                    $response = array(
                        'success' => false,
                        'message' => 'Invalid username or password'
                    );
                }
            } else {
                // User not found
                $response = array(
                    'success' => false,
                    'message' => 'Invalid username or password'
                );
            }
        }else{
            $response = array(
                'success' => false,
                'message' => 'could not access bdd info'
            );
        }


        // Echo response as a json
        return json_encode($response);
    }

    public function findUserById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM user WHERE ID_USER = ?");
        $stmt->bind_param("i", $id);

        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $user = new UserDTO($row['ID_USER'], $row['USER_NAME'], $row['USER_PSEUDO'], $row['USER_PASSWORD'], $row['EMAIL'], $row['AVATAR']);
            $response = $user;
        }else{
            $response = null;
        }

        return $response;
    }

}
