<?php

require_once '../Database.php';
require_once '../DTOs/HobbyDTO.php';
require_once '../DTOs/HobbyCountDTO.php';
require_once '../DTOs/HobbyPostDTO.php';
require_once '../Repositories/UserRepository.php';

class HobbyRepository
{
    private $db;
    private static $instance = null;
    private UserRepository $userRepository;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
        $this->userRepository = UserRepository::getInstance();
    }

    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new HobbyRepository();
        }
        return self::$instance;
    }

    public function getAllHobbies()
    {

        $hobbies = [];

        $result = $this->getHobbies();

        if ($result) {
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) array_push($hobbies, new HobbyDTO($row["ID_HOBBY"], $row["HOBBY_NAME"], $row["IMAGE"]));
                $response = array(
                    'success' => true,
                    'hobbies' => $hobbies
                );
            } else {
                $response = array(
                    'success' => false,
                    'message' => 'Hobby table empty'
                );
            }
        } else {
            $response = array(
                'success' => false,
                'message' => 'Could not fetch hobbies'
            );
        }
        echo json_encode($response);

    }

    private function getHobbies()
    {
        $stmt = $this->db->prepare("SELECT * FROM hobby");
        $stmt->execute();
        return $stmt->get_result();
    }

    /**
     * @return : top 3 most popular hobbies and 3 random hobbies
     */
    public function fetchDisplayHobbies()
    {

        // store top 3 hobbies
        $top_hobbies = [];

        // store 3 random hobbies
        $rand_hobbies = [];

        $response = null;

        // top 3 most popular hobbies
        $stmt = $this->db->prepare(
            "SELECT
	                  hobp.`ID_HOBBY`
                    , hob.`HOBBY_NAME`
                    , COUNT(*)
                FROM
	                  hobby_post hobp
                      INNER JOIN
	                      hobby hob on hob.ID_HOBBY = hobp.ID_HOBBY
                GROUP BY
	                  hobp.ID_HOBBY
                    , hob.HOBBY_NAME
                ORDER BY
	                  COUNT(*) DESC LIMIT 3");
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result) {
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $hobbyDTO = new HobbyDTO($row["ID_HOBBY"], $row["HOBBY_NAME"], null);
                    $hobbyCountDTO = new HobbyCountDTO($hobbyDTO, $row["COUNT(*)"]);
                    array_push($top_hobbies, $hobbyCountDTO);
                }
                if ($result->num_rows == 3) {
                    // if number of rows == 3 there's a chance there is more than 3 hobbies

                    // select 3 random hobbies, those hobbies won't be part of the top 3 most popular hobbies
                    $stmt = $this->db->prepare(
                        "SELECT DISTINCT
                        hobp.`ID_HOBBY`
                        , hob.`HOBBY_NAME`
                        , COUNT(*)
                    FROM
	                      hobby_post hobp
                          INNER JOIN
	                      hobby hob on hob.ID_HOBBY = hobp.ID_HOBBY

                    WHERE
                        hob.`ID_HOBBY` NOT IN (?, ?, ?)
                    GROUP BY
	                    hob.ID_HOBBY
                        , hob.HOBBY_NAME
                    ORDER BY RAND() LIMIT 3");
                    $stmt->bind_param("iii", $top_hobbies[0]->hobbyDTO->id, $top_hobbies[1]->hobbyDTO->id, $top_hobbies[2]->hobbyDTO->id);
                    $stmt->execute();
                    $result = $stmt->get_result();

                    if ($result) {
                        if ($result->num_rows > 0) {
                            while ($row = $result->fetch_assoc()) {
                                $hobbyDTO = new HobbyDTO($row["ID_HOBBY"], $row["HOBBY_NAME"], null);
                                $hobbyCountDTO = new HobbyCountDTO($hobbyDTO, $row["COUNT(*)"]);
                                array_push($top_hobbies, $hobbyCountDTO);
                            }
                            $response = array(
                                'success' => true,
                                'hobbies' => array_merge($top_hobbies, $rand_hobbies)
                                //'rand_hobbies' => $rand_hobbies
                            );
                        } else {
                            $response = array(
                                'success' => true,
                                'hobbies' => $top_hobbies
                            );
                        }
                    } else {
                        $response = array(
                            'success' => true,
                            'hobbies' => $top_hobbies,
                            'message' => 'could not fetch random hobbies'
                        );
                    }
                } else {
                    $response = array(
                        'success' => true,
                        'hobbies' => $top_hobbies,
                        'message' => 'not enough'
                    );
                }
            } else {
                $response = array(
                    'success' => false,
                    'message' => 'Hobby table empty'
                );
            }
        } else {
            $response = array(
                'success' => false,
                'message' => 'Error fetching data from table'
            );
        }
        echo json_encode($response);
    }

    /**
     * @param $id
     * @return void
     * fetches the hobby in a user's bio, with their avancement, the frequency at which they partake in the hobby, their availability
     */
    function fetchHobbiesOfUser($id_user)
    {

        $hobbies = [];

        $stmt = $this->db->prepare(
            "SELECT
	                    hobby_post.`ID_HOBBY`
                      , hobby.`HOBBY_NAME`
                      , hobby.`IMAGE`
                    FROM
	                    hobby_post
                        INNER JOIN
	                        hobby ON hobby.`ID_HOBBY` = hobby_post.`ID_HOBBY`
                    WHERE
	                    hobby_post.`ID_USER` = ?");

        $stmt->bind_param("i", $id_user);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($result) {
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) array_push($hobbies, new HobbyDTO($row["ID_HOBBY"], $row["HOBBY_NAME"], $row["IMAGE"]));
                $response = $hobbies;
            } else {
                $response = array(
                    'success' => true,
                    'message' => 'this user does not have any hobby'
                );
            }
        } else {
            $response = array(
                'success' => false,
                'message' => 'could not access table'
            );
        }
        return $hobbies;
    }

    function fetchAvailableHobbiesOfUser($id)
    {
        $id_user = $id;

        $hobbies = [];

        $stmt = $this->db->prepare("
            SELECT
	            hob.ID_HOBBY
                ,hob.HOBBY_NAME
            FROM
	            hobby hob
            WHERE
	            hob.ID_HOBBY NOT IN
	                (
        	        SELECT
	        	        hob_p.ID_HOBBY
                    FROM
	                    hobby_post hob_p
                    WHERE
	                    hob_p.ID_USER = ?
                    )
                    ;
        ");
        $stmt->bind_param("i", $id_user);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($result) {
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) $hobbies[] = new HobbyDTO($row["ID_HOBBY"], $row["HOBBY_NAME"], null);
                return json_encode($hobbies);
            } else {
                $response = array(
                    'success' => true,
                    'id' => $id_user,
                    'message' => 'this user already has all hobbies in their bio'
                );
            }
        } else {
            $response = array(
                'success' => false,
                'message' => 'could not access table'
            );
        }

        return json_encode($response);
    }

    public function getHobbiesFlashcardsOfUser($id_user)
    {
        $hobbies = [];
        $response = null;
        $stmt = $this->db->prepare(
            "SELECT
                        hobby_post.ID_HOBBY_POST
	                    , hobby_post.`ID_HOBBY`
                        , hobby_post.`EXPERIENCE`
                        , hobby_post.`AVAILABLE`
                        , hobby_post.`FREQUENCY`
                        , hobby.`HOBBY_NAME`
                    FROM
	                    hobby_post
                        INNER JOIN
	                        hobby ON hobby.`ID_HOBBY` = hobby_post.`ID_HOBBY`
                    WHERE
	                    hobby_post.`ID_USER` = ?");

        $stmt->bind_param("i", $id_user);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($result) {
            if ($result->num_rows > 0) {

                while ($row = $result->fetch_assoc()) $hobbies[] = new HobbyPostDTO($row["ID_HOBBY_POST"], $id_user, $row["ID_HOBBY"], $row["HOBBY_NAME"], $row["FREQUENCY"], $row["EXPERIENCE"], $row["AVAILABLE"]);

            }else{
                $response = array(
                    'success' => true,
                    'message' => 'user does not have any hobby',
                    "id" => $id_user
                );
            }
        }else{
            $response = array(
                'success' => false,
                'message' => "could not access dtb"
            );
        }
        return $hobbies;
    }

    public function getNumHobbies($id_user)
    {
        $stmt = $this->db->prepare("
            SELECT
                COUNT(*)    AS num_hobbies
            FROM
                hobby_post hob
            INNER JOIN user u
                ON u.ID_USER = hob.ID_USER
            WHERE
                u.ID_USER = ?
            ;
        ");
        $stmt->bind_param("i", $id_user);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row['num_hobbies'];
    }

    public function getHobbyUsers($id_hobby) {
        $stmt = $this->db->prepare("
            SELECT
                u.ID_USER
            FROM
                user u
            INNER JOIN HOBBY_POST hob
                ON u.ID_USER = hob.ID_USER
            WHERE
                hob.ID_HOBBY = ?
            ;
        ");
        $stmt->bind_param('i', $id_hobby);
        $stmt->execute();

        $result = $stmt->get_result();
        if($result->num_rows > 0) {
            $usersDTO = [];
            while($row = $result->fetch_assoc()) {
                $userDTO = $this->userRepository->findUserById($row['ID_USER']);
                $usersDTO[] = $userDTO;
            }
            return $usersDTO;
        }
        return null;
    }

    function newHobbyPost(HobbyPostDTO $hobbyPost)
    {
        $stmt = $this->db->prepare("
            INSERT INTO
	            hobby_post (ID_HOBBY, ID_USER, EXPERIENCE, FREQUENCY, AVAILABLE)
            VALUES
                (?, ?, ?, ?, ?)
            ;
        ");
        $stmt->bind_param("iissi", $hobbyPost->id_hobby, $hobbyPost->id_user, $hobbyPost->advancement, $hobbyPost->frequency, $hobbyPost->availability);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $hobbyPost->insertIdHobbyPost($stmt->insert_id);

            $stmt = $this->db->prepare("
            SELECT
                hob.HOBBY_NAME
            FROM
                hobby hob
            WHERE
                hob.ID_HOBBY = ?
            ");


            $stmt->bind_param("i", $hobbyPost->id_hobby);
            $stmt->execute();
            $result = $stmt->get_result();

            if($result){
                if ($result->num_rows == 1){
                    $row = $result->fetch_assoc();
                    $hobbyPost->insertHobbyName($row["HOBBY_NAME"]);
                }
            }

            $response = array(
                'success' => true,
                'hobby'   => $hobbyPost
            );
        } else {
            $response = array(
                'success' => false,
                'message' => $hobbyPost
            );
        }

        return json_encode($response);
    }

    function findHobbyById($id)
    {
        $stmt = $this->db->prepare("
            SELECT
                *
            FROM
                hobby hob
            WHERE
                hob.ID_HOBBY = ?
            ;
        ");
        $stmt->bind_param('i', $id);
        $stmt->execute();

        $result = $stmt->get_result();
        if($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            return new HobbyDTO($row['ID_HOBBY'], $row['HOBBY_NAME'], $row['IMAGE']);
        }
        return null;
    }

    public function destroyHobbyPost(mixed $id_hobby_post)
    {
        $stmt = $this->db->prepare("DELETE FROM hobby_post WHERE ID_HOBBY_POST = ?");
        $stmt->bind_param("i", $id_hobby_post);
        $stmt->execute();

        if($stmt->affected_rows === 1){
            $response = "Success";
        }else{
            $response = "Failure";
        }

        echo json_encode($response);

    }

    public function getHobbyById($id_hobby)
    {
      $stmt = $this->db->prepare("
        SELECT
          *
         FROM
             hobby hob
        WHERE
            hob.ID_HOBBY = ?
      ");
      $stmt->bind_param("i", $id_hobby);
      $stmt->execute();
      $result = $stmt->get_result();

      if($result){

        $row = $result->fetch_assoc();

        return json_encode(new HobbyDTO($row["ID_HOBBY"], $row["HOBBY_NAME"], $row["IMAGE"]));

      }else{
        return json_encode($stmt->error);
      }

    }

    public function setFavoriteHobby(mixed $id, mixed $id_user)
    {


      $stmt = $this->db->prepare("
        DELETE FROM
            favorite_hobby
        WHERE
            ID_USER = ?

      ");
      $stmt->bind_param("i", $id_user);
      $stmt->execute();

      if($stmt->error == null){


        $stmt = $this->db->prepare("
        INSERT INTO
            favorite_hobby
            (ID_USER, ID_HOBBY)
        VALUES
            (?, ?)
        ");
        $stmt->bind_param("ii", $id_user, $id);
        $stmt->execute();

        if($stmt->affected_rows == 1){
          return json_encode($this->findHobbyById($id));
        }


      }

    }


}
