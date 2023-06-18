<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once "../DTOs/PostDTO.php";
require_once "../DTOs/UserDTO.php";
require_once "../DTOs/HobbyDTO.php";
require_once "../Repositories/PostRepository.php";
require_once "../Repositories/CommentRepository.php";
require_once "../Repositories/ImageRepository.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $body = file_get_contents('php://input');

  $data = json_decode($body, true);


  if (isset($data['id_post'])) {
    $postId = $data['id_post'];
  } else {
    newPost();
    return;
  }


  $postRepository = PostRepository::getInstance();
  switch ($data['type']) {
    // Called when a user wants to like a post; he can only like it once
    case 'like':
      echo json_encode($postRepository->likePost($data['id_user'], $postId));
      break;
    // To unlike a post
    case 'unlike':
      echo json_encode($postRepository->unlikePost($data['id_user'], $postId));
      break;
    // Used to delete a post
    case 'deletePost':
      echo $postRepository->deletePost($postId);

  }

} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {

  $id = $id_user = $id_hobby = $description = $images = $modified = $likes = $time = $mode = null;
  $valid = false;

  if (isset($_GET['type'])) {
    $postRepository = PostRepository::getInstance();
    if ($_GET['type'] === 'home')
      echo json_encode($postRepository->getAllPosts());
    elseif ($_GET['type'] === 'hobby' && isset($_GET['id_hobby']))
      // Retrieve all posts
      echo json_encode($postRepository->getHobbyPosts($_GET['id_hobby']));
    elseif ($_GET['type'] === 'find_post') {
      // Retrieve all hobby posts
      echo json_encode($postRepository->findPostById($_GET['postID']));
    } elseif ($_GET['type'] === 'hasLiked') {
      // Checks if a user has liked a specific post
      echo json_encode($postRepository->hasLiked($_GET['id_user'], $_GET['id_post']));
    }

  } elseif (isset($_GET['user_page']) && isset($_GET['id_user'])) {
    $id_user = $_GET['id_user'];
    $mode = $_GET['user_page'];
    $valid = true;
  } elseif (isset($_GET['search']) && isset($_GET['id_hobby'])) {
    $id_hobby = $_GET['id_hobby'];
    $mode = $_GET['search'];
    $valid = true;
  }
}
/**
 * @return void
 * Method used to create a new post
 */
function newPost()
{
  // Check if the hobby in the post exists and is selected
  if (isset($_POST['id_hobby']) && $_POST['id_hobby'] != -1) {
    $hobbyDTO = new HobbyDTO($_POST['id_hobby']);
  } else {
    $hobbyDTO = new HobbyDTO(null);
  }

  $userDTO = new UserDTO($_POST['id_user'], $_POST['user_name'], $_POST['user_username']);
  $description = $_POST['description'];

  $images = null;

  if (isset($_FILES['images'])) {

    $images = $_FILES['images'];
  }
  // Create a new instance of ImageRepository and use of the saveImages method
  $imageRepository = ImageRepository::getInstance();
  $uploadedFiles = $imageRepository->saveImages($images);
  // Create a new postDTO
  $postDTO = new PostDTO(null, $userDTO, $hobbyDTO, $description, $uploadedFiles);

  $postRepository = PostRepository::getInstance();
  echo json_encode($postRepository->newPost($postDTO));
}


?>
