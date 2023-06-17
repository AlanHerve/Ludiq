<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");


require_once '../Database.php';
require_once '../DTOs/PostDTO.php';
require_once '../DTOs/UserDTO.php';
require_once '../DTOs/HobbyDTO.php';
require_once '../Repositories/UserRepository.php';
require_once '../Repositories/HobbyRepository.php';
require_once '../Repositories/ImageRepository.php';

class PostRepository
{

  private static $instance = null;
  private $db;
  private $userRepository;
  private $hobbyRepository;
  private $imageRepository;

  public function __construct()
  {
    $this->db = Database::getInstance()->getConnection();
    $this->hobbyRepository = HobbyRepository::getInstance();
    $this->userRepository = UserRepository::getInstance();
    $this->imageRepository = ImageRepository::getInstance();
  }

  public static function getInstance()
  {
    if (!self::$instance) {
      self::$instance = new PostRepository();
    }
    return self::$instance;
  }

  public function newPost(PostDTO $regularPostDTO)
  {
    $id_user = $regularPostDTO->userDTO->id;
    $id_hobby = $regularPostDTO->hobbyDTO->id;
    $description = $regularPostDTO->description;
    $images = $regularPostDTO->images;
    $stmt = $this->db->prepare("INSERT INTO regular_post (ID_USER, ID_HOBBY, DESCRIPTION, IMAGE1, IMAGE2, IMAGE3, IMAGE4) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("iisssss", $id_user, $id_hobby, $description, $images[0], $images[1], $images[2], $images[3]);

    $stmt->execute();

    if ($stmt->affected_rows > 0) {
      return true;
    } else {
      return false;
    }
  }

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
  }



    function likePost($userId, $postId)
    {
        //Vérifie d'abord si l'utilisateur a déjà aimé ce post
        $stmt = $this->db->prepare("
        SELECT
            *
        FROM
            user_post_likes lik
        WHERE
            lik.ID_USER = ?
            AND
            lik.ID_REGULAR_POST = ?
        ;
    ");
        $stmt->bind_param("ii", $userId, $postId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // L'utilisateur a déjà aimé ce post, ne rien faire
            return [];
        }

        // L'utilisateur n'a pas encore aimé ce post, ajoute un like
        $stmt = $this->db->prepare("
        INSERT INTO
            user_post_likes (ID_USER, ID_REGULAR_POST)
        VALUES (?, ?)
        ;
    ");
        $stmt->bind_param("ii", $userId, $postId);
        $stmt->execute();

        // Augmente également le nombre de likes du post
        $stmt = $this->db->prepare("
        UPDATE
            regular_post reg
        SET
            reg.LIKES = reg.LIKES + 1
        WHERE
            reg.ID_REGULAR_POST = ?
        ;
    ");
        $stmt->bind_param("i", $postId);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            $response = array(
                'success' => true
            );
        } else {
            $response = array(
                'success' => false
            );
        }

        return $response;
    }


    function unlikePost($userId, $postId)
    {
        // Vérifie d'abord si l'utilisateur a déjà aimé ce post
        $stmt = $this->db->prepare("
        SELECT
            *
        FROM
            user_post_likes lik
        WHERE
            lik.ID_USER = ?
            AND
            lik.ID_REGULAR_POST = ?
        ;
    ");
        $stmt->bind_param("ii", $userId, $postId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // L'utilisateur a déjà aimé ce post, supprimer le like
            $stmt = $this->db->prepare("
            DELETE FROM
                user_post_likes
            WHERE
                ID_USER = ?
                AND
                ID_REGULAR_POST = ?
            ;
        ");
            $stmt->bind_param("ii", $userId, $postId);
            $stmt->execute();

            // Diminue également le nombre de likes du post
            $stmt = $this->db->prepare("
            UPDATE
                regular_post reg
            SET
                reg.LIKES = reg.LIKES - 1
            WHERE
                reg.ID_REGULAR_POST = ?
            ;
        ");
            $stmt->bind_param("i", $postId);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                $response = array(
                    'success' => true
                );
            } else {
                $response = array(
                    'success' => false
                );
            }

            return $response;
        }

        // L'utilisateur n'a pas encore aimé ce post, ne rien faire
        return [];
    }

  public function findPostById($id)
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
            while ($row = $result->fetch_assoc()) {
                $postDTO = $this->findPostById($row['ID_REGULAR_POST']);
                $postDTO->commentCount = $this->getCommentCount($row['ID_REGULAR_POST']);
                $postDTO->comments = $this->getComments($row['ID_REGULAR_POST']);
                $postsDTO[] = $postDTO;
            }
        }
        return $postsDTO;
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

    public function getCommentCount($postId)
    {
        $stmt = $this->db->prepare("SELECT COUNT(*) as commentCount FROM comment WHERE ID_REGULAR_POST = ?");
        $stmt->bind_param("i", $postId);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row['commentCount'];
    }

    public function getComments($postId)
    {
        $commentRepository = CommentRepository::getInstance();
        return $commentRepository->getComments($postId);
    }

    public function hasLiked($userId, $postId)
    {
        $stmt = $this->db->prepare("SELECT * FROM user_post_likes WHERE ID_USER = ? AND ID_REGULAR_POST = ?");
        $stmt->bind_param("ii", $userId, $postId);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            return true;
        }
        return false;
    }

    public function getHobbyPosts($id_hobby)
    {
        $stmt = $this->db->prepare("
>>>>>>> origin/eileen2
            SELECT
                *
            FROM
                regular_post reg
            WHERE
                reg.ID_HOBBY = ?
            ORDER BY
                reg.TIME
            DESC
            ;
        ");
    $stmt->bind_param('i', $id_hobby);
    $stmt->execute();
    $result = $stmt->get_result();
    $postsDTO = [];
    if ($result->num_rows > 0) {
      while ($row = $result->fetch_assoc())
        $postsDTO[] = $this->findPostById($row['ID_REGULAR_POST']);
    }
    return $postsDTO;
  }
}

?>
