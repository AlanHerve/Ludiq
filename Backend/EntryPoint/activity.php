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
    $body = file_get_contents('php://input');
    $data = json_decode($body, true);

    if (isset($data['type'])) {
        $activityRepository = ActivityRepository::getInstance();
        if ($data['type'] === 'activity_post') {
            return;
        }
        if ($data['type'] === 'register_activity') {
            echo json_encode($activityRepository->registerUserToActivity($data['userId'], $data['activityId']));
            return;
        }
        if ($data['type'] === 'unregister_activity') {
            echo json_encode($activityRepository->deleteUserFromActivity($data['userId'], $data['activityId']));
            return;
        }
    }
    /*$userDTO = new UserDTO($_POST['id_user'], $_POST['user_name'], $_POST['user_username']);

    if ($_POST['id_hobby'] != -1) $hobbyDTO = new HobbyDTO($_POST['id_hobby']);
    else $hobbyDTO = new HobbyDTO(null);


    $description = $_POST['description'];
    $time = $_POST['time'];

    if (isset($data['modified'])) {
      $modified = $data['modified'];
    }

    $images = $_FILES['images'];

    $uploadedFiles = saveFiles($images);

    $activityDTO = new ActivityDTO(null, null, $hobbyDTO, null, $description, null, $time, null, null, null);
    $activityRepository = ActivityRepository::getInstance();
    echo json_encode($activityRepository->newActivity($activityDTO));
 */
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['type'])) {
        $activityRepository = ActivityRepository::getInstance();
        if ($_GET['type'] === 'top3') {
            echo json_encode($activityRepository->getTop3());
        }
        if ($_GET['type'] === 'all_activities') {
            echo json_encode($activityRepository->getAllActivities());
        }
        if ($_GET['type'] === 'activity') {
            echo json_encode($activityRepository->findActivityById($_GET['activityId']));
        }
        if ($_GET['type'] === 'activity_participants') {
            echo json_encode($activityRepository->getActivityParticipants($_GET['activityId']));
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



