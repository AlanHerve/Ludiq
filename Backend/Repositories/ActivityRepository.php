<?php
require_once '../Database.php';
require_once '../DTOs/ActivityDTO.php';
class ActivityRepository
{
  private $db;
  private static $instance = null;
  private $userRepository;
  private $hobbyRepository;
  private $OrganizationRepository;

  public function __construct()
  {
    // Assign the database connection to the $db variable
    $this->db = Database::getInstance()->getConnection();

    // Initialize other repositories
    $this->hobbyRepository = HobbyRepository::getInstance();
    $this->userRepository = UserRepository::getInstance();
    $this->OrganizationRepository = OrganizationRepository::getInstance();
  }

  // method to get an instance of ActivityRepository
  public static function getInstance()
  {
    console.log("create an instance");
    if (!self::$instance) { //if the instance doesn't exist then create a new one
      self::$instance = new ActivityRepository();
    }
    return self::$instance; //return the instance
  }

  public function newActivity(ActivityDTO  $activityDTO)
  {
    $id_user = $activityDTO->userDTO->id ;
    $id_hobby = $activityDTO->hobbyDTO->id ;
    $description = $activityDTO->description;
    $images = $activityDTO->images;
    console.log("avant la requete");
    $stmt = $this->db->prepare("INSERT INTO activity (ID_ACTIVITY_DIRECTOR, ID_HOBBY, DESCRIPTION , DATE_ACTIVITY , MAX_REGISTRATIONS,IMAGE) VALUES (?, ?, ?, ?, ?, ?)");
    console.log($stmt);
    $stmt->bind_param("iissis", $id_activity_director, $id_hobby, $description, $time, $max_registrations, $images);
    $stmt->execute();
    //->inserer que ce qui n'a pas de valeur de base
    //iisssss -> int int string string string...
    //requetes pour aller chopper les bails à refaire

    if ($stmt->affected_rows > 0) { //if rows are affected it means the database has been modified
      $response = array(
        'success' => 'true'
      );
    } else { //if not, nothing has been added in the database, therefore there is a problem somewhere
      $response = array(
        'success' => 'false'
      );
    }

    return json_encode($response);
  }
}
/*

    public function getUserPosts($id_user)
    {
        $stmt = $this->db->prepare("
            SELECT
                reg.ID_REGULAR_POST
            FROM
                regular_post reg
            WHERE
                reg.ID_USER = ?
            ORDER BY
                reg.TIME
            DESC
            ;
        ");
        $stmt->bind_param('i', $id_user);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $postsDTO = [];
            while ($row = $result->fetch_assoc()) {
                $postsDTO[] = $this->findPostById($row['ID_REGULAR_POST']);
            }
            return $postsDTO;
        }
        return [];
    }

    private function findPostById($id)
    {
        $stmt = $this->db->prepare("
        SELECT
            reg.*
            ,u.ID_USER
            ,hob.ID_HOBBY
        FROM
            regular_post reg
        INNER JOIN user u
            ON u.ID_USER = reg.ID_USER
        LEFT JOIN hobby hob
            ON hob.ID_HOBBY = reg.ID_HOBBY
        WHERE
            reg.ID_REGULAR_POST = ?
        ");

        $stmt->bind_param("i", $id);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $images = [$row['IMAGE1'], $row['IMAGE2'], $row['IMAGE3'], $row['IMAGE4']];
            $userDTO = $this->userRepository->findUserById($row['ID_USER']);
            $hobbyDTO = $this->hobbyRepository->findHobbyById($row['ID_HOBBY']);
            return new PostDTO($row['ID_REGULAR_POST'], $userDTO, $hobbyDTO, $row['DESCRIPTION'],
                $images, $row['MODIFIED'], $row['LIKES'], $row['TIME']);
        }
    }

    public function getAllPosts()
    {
        $stmt = $this->db->prepare("SELECT * FROM regular_post reg ORDER BY reg.TIME DESC");
        $stmt->execute();
        $result = $stmt->get_result();
        $postsDTO = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc())
                $postsDTO[] = $this->findPostById($row['ID_REGULAR_POST']);
        }
        return json_encode($postsDTO);
    }

    public function getNumPosts($id_user)
    {
        $stmt = $this->db->prepare("
            SELECT
                COUNT(*)    AS num_posts
            FROM
                regular_post reg
            WHERE
                reg.ID_USER = ?
            ;
        ");
        $stmt->bind_param("i", $id_user);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row['num_posts'];
    }

    public function getPosts($mode, PostDTO $regularPostDTO)
    {
        $result = null;
        $arrayPost = [];
        $success = false;
        $content = 0;

        if ($mode == "search") {


        } elseif ($mode == "userPage") {


            $id_user = $regularPostDTO->id;

            $stmt = $this->db->prepare("SELECT * FROM regular_post reg WHERE reg.ID_USER=?");
            $stmt->bind_param("s", $id_user);
            $stmt->execute();

            $result = $stmt->get_result();
            if ($result) {
                $success = true;
                while ($row = $result->fetch_assoc()) {
                    $content++;
                    array_push($arrayPost, $row);
                }
            }
            if ($success) {

                if ($content == 0) {
                    $response = array(
                        'success' => true,
                        'content' => "empty"
                    );
                } else {
                    $response = array(
                        'success' => true,
                        'content' => "some",
                        'posts' => $arrayPost
                    );
                }

            } else {
                $reponse = array(
                    'success' => false
                );
            }


        }

    }

    public function getSinglePost($id)
    {

    }

    public function getHobbiesFlashcardsOfUser($id)
    {
        $hobbies = [];

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

                while ($row = $result->fetch_assoc()) array_push($hobbies, new HobbyPostDTO($row["ID_HOBBY_POST"], $id_user, $row["ID_HOBBY"], $row["HOBBY_NAME"], $row["FREQUENCY"], $row["EXPERIENCE"], $row["AVAILABLE"]));
                $response = $hobbies;
            }
        }
        return $hobbies;
    }

}

?>*/
