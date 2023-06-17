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
    case 'like':
      echo json_encode($postRepository->likePost($data['id_user'], $postId));
      break;
    case 'unlike':
      echo json_encode($postRepository->unlikePost($data['id_user'], $postId));
      break;

  }

  if (isset($_POST['new_post'])) {
    newPost();
    return;
  }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {

  $id = $id_user = $id_hobby = $description = $images = $modified = $likes = $time = $mode = null;
  $valid = false;

  if (isset($_GET['type'])) {
    $postRepository = PostRepository::getInstance();
    if ($_GET['type'] === 'home')
      echo json_encode($postRepository->getAllPosts());
    elseif ($_GET['type'] === 'hobby' && isset($_GET['id_hobby']))
      echo json_encode($postRepository->getHobbyPosts($_GET['id_hobby']));
    elseif ($_GET['type'] === 'find_post') {
      echo json_encode($postRepository->findPostById($_GET['postID']));
    } elseif ($_GET['type'] === 'hasLiked') {
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

function newPost()
{
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

  $imageRepository = ImageRepository::getInstance();
  $uploadedFiles = $imageRepository->saveImages($images);

  $postDTO = new PostDTO(null, $userDTO, $hobbyDTO, $description, $uploadedFiles);

  $postRepository = PostRepository::getInstance();
  echo json_encode($postRepository->newPost($postDTO));
}


?>
