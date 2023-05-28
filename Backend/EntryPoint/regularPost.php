<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../DTOs/RegularPostDTO.php");
include("../Repositories/RegularPostRepository.php");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $body = file_get_contents('php://input');
  $data = json_decode($body,true);

  $id = null;
  $id_user = $data['id_user'];
  $id_hobby = $data['id_hobby'];
  $description = $data['description'];
  $modified = null;
  $likes = null;
  $time = null;

  if(isset($data['modified'])){
    $modified = $data['modified'];
  }
  $images = $_FILES['images'];
  $targetDir = '../assets/images/';

  $uploadedFiles = saveFiles($images, $targetDir);

  $regularPostDTO = new RegularPostDTO(null, $id_user, $id_hobby, $description, $uploadedFiles, $modified, $likes, $time);

  $regularPostRepository = RegularPostRepository::getInstance();
  $json = $regularPostRepository->newRegularPost($regularPostDTO);
  echo $json;

} elseif ($_SERVER['REQUEST_METHOD'] === 'GET'){

  $body = file_get_contents('php://input');
  $data = json_decode($body,true);

  $id = $id_user = $id_hobby = $description = $images = $modified = $likes = $time = $mode = null;
  $valid = false;

  if(isset($data['singleton'])){

  }else{
    if (isset($data['userPage']) && isset($data['id_user'])){
      $id_user = $data['id_user'];
      $mode = $data['userPage'];
      $valid = true;

    }elseif (isset($data['search']) && isset($data['id_hobby'])){
      $id_hobby = $data['id_hobby'];
      $mode = $data['search'];
      $valid = true;

    }
    if($valid){
      $regularPostDTO = new RegularPostDTO($id, $id_user, $id_hobby, $description, $images, $modified, $likes, $time);
      $regularPostRepository = RegularPostRepository::getInstance();
      $regularPostRepository->getPosts($mode, $regularPostDTO);
    }
  }
}

function saveFiles($images, $targetDir) {
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
