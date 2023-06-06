<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../DTOs/PostDTO.php");
include("../Repositories/PostRepository.php");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $id = null;
  $id_user = $_POST['id_user'];
  $name = $_POST['user_name'];
  $user_name = $_POST['user_username'];
  $id_hobby = $_POST['id_hobby'];
  $description = $_POST['description'];
  $modified = null;
  $likes = null;
  $time = null;

  if(isset($data['modified'])){
    $modified = $data['modified'];
  }
  $images = $_FILES['images'];

  $uploadedFiles = saveFiles($images);

  $postDTO = new PostDTO(null, $name, $user_name, $id_user, null, $id_hobby, $description, $uploadedFiles, $modified, $likes, $time);

  $postRepository = PostRepository::getInstance();
  echo json_encode($postRepository->newPost($postDTO));
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
  /*if($valid) {
      $postDTO = new PostDTO($id, null, null, $id_user, $id_hobby, null, $description, $images, $modified, $likes, $time);
      $postRepository = PostRepository::getInstance();
      //echo $postRepository->getPosts($mode, $postDTO);
  }*/
}

function saveFiles($images) {
  $targetDir = '../assets/images/';

  if(!isset($images)) return null;

  $uploadedFiles = [];
  for ($i = 0; $i < count($images['name']); $i++) {
    $uniqueFilename = uniqid() . '_' . basename($images['name'][$i]);
    $targetFilePath = $targetDir . $uniqueFilename;

    if (move_uploaded_file($images['tmp_name'][$i], $targetFilePath)) {
      $uploadedFiles[] .= $uniqueFilename;
      echo 'File downloaded successfully!\n';
    } else {
      echo 'Error while downloading file : '.$images['tmp_name'][$i].'\n';
    }
  }
  return $uploadedFiles;
}

?>
