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
require_once "../Repositories/UserRepository.php";

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

    if (isset($data['modified'])) {
        $modified = $data['modified'];
    }

    if (isset($_POST['id_user']) && isset($_POST['id_hobby']) && isset($_POST['advancement']) && isset($_POST['description']) && isset($_POST['time']) && isset($_POST['max_registration']) && isset($_POST['title'])) {
        echo json_encode("PONEY");
        echo json_encode($_POST['title']);

        $value = $_POST['max_registration'];
        echo json_encode("poney bien apres isset");
        $activityDTO = new ActivityDTO(null, $_POST['id_user'], $_POST['id_hobby'], $_POST['advancement'], $_POST['description'], null, $_POST['time'], null, $_POST['max_registration'], null, $_POST['title'], null, null);
        $activityRepository = ActivityRepository::getInstance();
        $result = $activityRepository->newActivity($activityDTO);
        echo $result;
    }
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

