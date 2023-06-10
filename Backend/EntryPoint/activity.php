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
    $userDTO = new UserDTO($_POST['id_user'], $_POST['user_name'], $_POST['user_username']);

    if ($_POST['id_hobby'] != -1) $hobbyDTO = new HobbyDTO($_POST['id_hobby']);
    else $hobbyDTO = new HobbyDTO(null);


    $description = $_POST['description'];
    $time = $_POST['time'];

    /*if (isset($data['modified'])) {
      $modified = $data['modified'];
    }*/

    $images = $_FILES['images'];

    $uploadedFiles = saveFiles($images);

    $activityDTO = new ActivityDTO(null, null, $hobbyDTO, null, $description, null, $time, null, null, null);
    $activityRepository = ActivityRepository::getInstance();
    echo json_encode($activityRepository->newActivity($activityDTO));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['type'])) {
        if ($_GET['type'] === 'top3') {
            $activityRepository = ActivityRepository::getInstance();
            echo json_encode($activityRepository->getTop3());
        }
    }
}

function saveFiles($images)
{
    $targetDir = '../assets/images/';

    if (!isset($images)) return null;

    $uploadedFiles = [];
    for ($i = 0; $i < count($images['name']); $i++) {
        $uniqueFilename = uniqid() . '_' . basename($images['name'][$i]);
        $targetFilePath = $targetDir . $uniqueFilename;

        if (move_uploaded_file($images['tmp_name'][$i], $targetFilePath)) {
            $uploadedFiles[] .= $uniqueFilename;
            echo 'File downloaded successfully!\n';
        } else {
            echo 'Error while downloading file : ' . $images['tmp_name'][$i] . '\n';
        }
    }
    return $uploadedFiles;
}



