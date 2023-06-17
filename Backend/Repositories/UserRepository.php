<?php


require_once '../Database.php';
require_once '../DTOs/UserDTO.php';
require_once '../Repositories/OrganizationRepository.php';

class UserRepository
{
  private static $instance = null;
  private $db;
  private $organizationRepository;

  public function __construct()
  {
    $this->db = Database::getInstance()->getConnection();
    $this->organizationRepository = OrganizationRepository::getInstance();
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
   * @return bool
   */
  public function registerUser(UserDTO $userDTO, string $userType)
  {
    $name = $userDTO->name;
    $email = $userDTO->email;
    $pseudo = $userDTO->username;
    $password = $userDTO->password;

    $stmt = $this->db->prepare("INSERT INTO user (USER_NAME, USER_PSEUDO, USER_PASSWORD, EMAIL, AVATAR) VALUES (?, ?, ?, ?, null)");
    $stmt->bind_param("ssss", $name, $pseudo, $password, $email);

    $stmt->execute();

    $userId = $stmt->insert_id;

    if ($userType === "activity_director") {
      $organization_id = 1;
      $this->organizationRepository->addActivityDirector($userId, $organization_id);

      if ($stmt->affected_rows > 0) {
        return true;
      }
      return false;
    }
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
    if ($result) {


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
          if (isset($row["ID_ORGANIZATION"]) && isset($row["NAME_ORGANIZATION"])) {
            $token = $token . "_" . $row["ID_ORGANIZATION"] . "_" . $row["NAME_ORGANIZATION"];
          }
          $userDTO = $this->findUserById($row['ID_USER']);
          $userDTO->token = $token;
          $response = array(
            'success' => true,
            'message' => 'Authentication successful',
            'user' => $userDTO
          );
        } else {
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
    } else {
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
      return $user;
    }

    return null;
  }

  public function isActivityDirector($userId)
  {
    $stmt = $this->db->prepare("
            SELECT
                *
            FROM
                activity_director dir
            WHERE
                dir.ID_USER = ?
        ");
    $stmt->bind_param('i', $userId);
    $stmt->execute();

    if ($stmt->get_result()->num_rows > 0) {
      return true;
    }
    return false;
  }

  public function getFavoriteHobby($userId)
  {
    $stmt = $this->db->prepare("
            SELECT
                fav.ID_HOBBY
            FROM
                favorite_hobby fav
            WHERE
                fav.ID_USER = ?
        ");
    $stmt->bind_param('i', $userId);
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows == 1) {
      $row = $result->fetch_assoc();
      $hobbyRepository = HobbyRepository::getInstance();
      $hobbyDTO = $hobbyRepository->findHobbyById($row['ID_HOBBY']);
      return $hobbyDTO;
    }
    return null;
  }

  /**
   * Method to update a user in the User database
   *
   * @param UserDTO $userDTO
   * @return bool
   */
  public function updateUser(UserDTO $userDTO)
  {
    $id = $userDTO->id;
    $name = $userDTO->name;
    $username = $userDTO->username;
    $avatar = $userDTO->avatar;

    $query = "UPDATE user SET USER_NAME = ?, USER_PSEUDO = ?";
    $params = array($name, $username);

    if ($avatar != null) {
      $query .= ", AVATAR = ?";
      $params[] = $avatar;
    }

    if ($userDTO->password != '') {
      $password = password_hash($userDTO->password, PASSWORD_DEFAULT);
      $query .= ", USER_PASSWORD = ?";
      $params[] = $password;
    }

    $query .= " WHERE ID_USER = ?";
    $params[] = $id;

    $stmt = $this->db->prepare($query);

    if ($stmt) {
      $types = str_repeat('s', count($params) - 1) . 'i'; // All parameters except the last one are strings, and the last one is an int
      $stmt->bind_param($types, ...$params);
      $stmt->execute();
      $stmt->close();

      return true;
    }

    return false;
  }


  public function isPartOfAnOrganization(int $userId)
  {
    $stmt = $this->db->prepare("
        SELECT
            act_d.ID_ORGANIZATION
        FROM
            activity_director act_d
        WHERE
            act_d.ID_USER = ?
        ;
    ");
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      return $row['ID_ORGANIZATION'] != 1;
    }
    return false;
  }

  public function findUserOrganization($userId)
  {
    $stmt = $this->db->prepare("
        SELECT
            org.ID_ORGANIZATION
        FROM
            organization org
        INNER JOIN activity_director act_d
            ON act_d.ID_ORGANIZATION = org.ID_ORGANIZATION
        WHERE
            act_d.ID_USER = ?
    ");

    $stmt->bind_param('i', $userId);
    $stmt->execute();

    $result = $stmt->get_result();
    if($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      return $this->organizationRepository->findOrganizationById($row['ID_ORGANIZATION']);
    }

    return null;
  }


}
