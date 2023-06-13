<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

require_once "../DTOs/PostDTO.php";
require_once "../DTOs/UserDTO.php";
require_once "../DTOs/HobbyDTO.php";
require_once "../Repositories/PostRepository.php";
require_once "../Repositories/CommentRepository.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $body = file_get_contents('php://input');
  $data = json_decode($body,true);

  $userDTO = new UserDTO($_POST['id_user'], $_POST['user_name'], $_POST['user_pseudo']);

  $postId = $data['id_post'];
  $id = null;


  $postRepository = PostRepository::getInstance();
  $commentRepository = CommentRepository::getInstance();
  switch ($data['type']) {
    case 'like':
      echo $postRepository->likePost($postId);
      break;
    case 'unlike':
      echo $postRepository->unlikePost($postId);
      break;
    case 'post':
      newPost();
      break;
    case 'addComment':
      echo $commentRepository->addComment($data['id_user'], $data['content'], $data['id_regular_post']);
      break;

  }
}

elseif ($_SERVER['REQUEST_METHOD'] === 'GET'){

  $id = $id_user = $id_hobby = $description = $images = $modified = $likes = $time = $mode = null;
  $valid = false;

  if(isset($_GET['type'])) {
    $postRepository = PostRepository::getInstance();
    if($_GET['type'] === 'home')
      echo $postRepository->getAllPosts();
  }
  elseif (isset($_GET['user_page']) && isset($_GET['id_user'])){
    $id_user = $_GET['id_user'];
    $mode = $_GET['user_page'];
    $valid = true;
  }
  elseif (isset($_GET['search']) && isset($_GET['id_hobby'])){
    $id_hobby = $_GET['id_hobby'];
    $mode = $_GET['search'];
    $valid = true;
  }
}

function newPost() {
  if(isset($_POST['id_hobby']) && $_POST['id_hobby'] != -1) {
    $hobbyDTO = new HobbyDTO($_POST['id_hobby']);
  } else {
    $hobbyDTO = new HobbyDTO(null);
  }

  $userDTO = new UserDTO($_POST['id_user'], $_POST['user_name'], $_POST['user_username']);
  $description = $_POST['description'];
  $modified = null;
  $likes = null;
  $time = null;

  if(isset($_POST['modified'])){
    $modified = $_POST['modified'];
  }
  $images = $_FILES['images'];

  $uploadedFiles = saveFiles($images);

  $postDTO = new PostDTO(null, $userDTO, $hobbyDTO, $description, $uploadedFiles);

  $postRepository = PostRepository::getInstance();
  echo json_encode($postRepository->newPost($postDTO));
}

function saveFiles($images) {
  $targetDir = '../assets/images/';

  if(!isset($images)) return null;

  $uploadedFiles = [];
  for ($i = 0; $i < count($images['name']); $i++) {
    $uniqueFilename = uniqid() . '_' . basename($images['name'][$i]);
    $targetFilePath = $targetDir . $uniqueFilename;

    if (move_uploaded_file($images['tmp_name'][$i], $targetFilePath)) {
      $uploadedFiles[] = $uniqueFilename;
      echo 'File downloaded successfully!\n';
    } else {
      echo 'Error while downloading file : '.$images['tmp_name'][$i].'\n';
    }
  }
  return $uploadedFiles;
}

?>
