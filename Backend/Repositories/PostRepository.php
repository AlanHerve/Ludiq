<?php

require_once '../Database.php';
require_once '../DTOs/PostDTO.php';

class PostRepository
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
            self::$instance = new PostRepository();
        }
        return self::$instance;
    }

    public function newPost(PostDTO $postDTO)
    {
        $id_user = 3;
        $id_hobby = 1;
        $description = $postDTO->description;
        $images = $postDTO->images;
        $stmt = $this->db->prepare("INSERT INTO regular_post (ID_USER, DESCRIPTION, IMAGE1, IMAGE2, IMAGE3, IMAGE4) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("isssss", $id_user, $description, $images[0], $images[1], $images[2], $images[3]);

        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $response = array(
                'success' => 'true'
            );
        } else {
            $response = array(
                'success' => 'false'
            );
        }

        return json_encode($response);
    }

    public function findPostByID(int $id)
    {
        $stmt = $this->db->prepare("
            SELECT
                 reg.*
                ,u.USER_NAME
                ,u.AVATAR
                ,u.USER_PSEUDO
            FROM
                regular_post reg
            INNER JOIN user u
                ON reg.ID_USER = u.ID_USER
            WHERE
                reg.ID_REGULAR_POST = ?
        ");
        $stmt->bind_param("i", $id);
        $stmt->execute();

        $result = $stmt->get_result();
        if($result) {
            $row = $result->fetch_assoc();
            $str_images = [$row['IMAGE1'], $row['IMAGE2'], $row['IMAGE3'], $row['IMAGE4']];

            return new PostDTO($row['ID_REGULAR_POST'], $row['USER_NAME'], $row['USER_PSEUDO'], $row['ID_USER'], 0, $row['DESCRIPTION'], $str_images, $row['MODIFIED'], $row['LIKES'], $row['TIME']);
        }
        return null;
    }

    /**
     * Method that returns all the posts in the database
     *
     * @return false|string
     */
    public function getAllPosts()
    {
        $stmt = $this->db->prepare("SELECT * FROM regular_post reg");
        $stmt->execute();

        $result = $stmt->get_result();
        $postsDTO = [];
        while ($row = $result->fetch_assoc()) {
            // We create a new postDTO according to its ID
            $postDTO = $this->findPostByID($row['ID_REGULAR_POST']);
            // If we find the post according to its ID, we add it in the array
            if($postDTO) $postsDTO[] = $postDTO;
        }

        return json_encode($postsDTO);
    }

    public function getPosts($mode, PostDTO $postDTO)
    {

        if ($mode == "user_page") {
            return json_encode("poney");
            $id_user = $postDTO->id_user;

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
                        'posts' => $arrayPost
                    );
                }

            } else {
                $response = array(
                    'success' => false
                );
            }
        }
        return json_encode($response);
    }

    public function getSinglePost($id)
    {

    }

    private function findImagesOnLocalStorage($strings)
    {
        $files = [];
        foreach ($strings as $string) {
            $file = '../assets/images/' . $string;
            if (file_exists($file)) {
                $fileContent = file_get_contents($file);

                $files[] = $fileContent;
            }
        }
        return $files;
    }

}

?>
