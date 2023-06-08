<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../DTOs/ActivityDTO.php");
include("../Repositories/PostRepository.php");

require_once "../DTOs/ActivityDTO.php";
require_once "../DTOs/UserDTO.php";
require_once "../DTOs/HobbyDTO.php";
require_once "../Repositories/ActivityRepository.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $id = null;
  $userDTO = new UserDTO($_POST['id_user'], $_POST['user_name'], $_POST['user_username']);

  if ($_POST['id_hobby'] != -1) $hobbyDTO = new HobbyDTO($_POST['id_hobby']);
  else $hobbyDTO = new HobbyDTO(null);

  $description = $_POST['description'];
  $time = $_POST['time'];

  if (isset($data['modified'])) {
    $modified = $data['modified'];
  }

  $images = $_FILES['images'];
  $uploadedFiles = saveFiles($images);

  $activityDTO = new activityDTO(null, null, $hobbyDTO, null, $description, null, $time, null, null)
  $activityRepository = ActivityRepository::getInstance();
  echo json_encode($activityRepository->newActivity($activityDTO));
  }

elseif ($_SERVER['REQUEST_METHOD'] === 'GET'){
    $id = $id_organization = $id_hobby = $advancement = $description = $date = $time = $current_registered = $max_registrations = $images = null;
    $valid = false;
//must add images in the database as there are no field dedicated to it yet in activity
    if(isset($_GET['type'])) {
      $postRepository = PostRepository::getInstance();
      if($_GET['type'] === 'home')
      {
        echo $postRepository->getAllPosts();
      }
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
*/
