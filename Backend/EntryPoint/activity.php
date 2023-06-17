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


// If this is a post request :
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $body = file_get_contents('php://input');
  $data = json_decode($body, true);


  // We check if the type of post is set
  if (isset($data['type'])) {
    // If this is the case, we create a new instance of an activityRepository
    $activityRepository = ActivityRepository::getInstance();
    // We check the value of the type passed in parameter of the http request
    // If this is a register_activity
    if ($data['type'] === 'register_activity') {
      // We call the function that is registering the user into an activity
      echo json_encode($activityRepository->registerUserToActivity($data['userId'], $data['activityId']));
    }
    // Otherwise, we unregister it if it is unregister_activity
    elseif ($data['type'] === 'unregister_activity') {
      echo json_encode($activityRepository->deleteUserFromActivity($data['userId'], $data['activityId']));
    }
    // Or we delete the activity
    elseif ($data['type'] === 'deleteActivity') {
      echo json_encode($activityRepository->deleteActivity($data['activityId']));

    }

  }
  // If the type isn't spectified, it means that we simply add a new activity
  else {
    if (isset($data['modified'])) {
      $modified = $data['modified'];
    }

    // We check that everything isset before we post the new activity
    if (isset($_POST['id_user']) && isset($_POST['id_hobby']) && isset($_POST['advancement']) && isset($_POST['description']) && isset($_POST['time']) && isset($_POST['max_registration']) && isset($_POST['title'])) {

      $value = $_POST['max_registration'];

      $activityDTO = new ActivityDTO(null, $_POST['id_user'], $_POST['id_hobby'], $_POST['advancement'], $_POST['description'], null, $_POST['time'], null, $_POST['max_registration'], null, $_POST['title'], null, null);

      $activityRepository = ActivityRepository::getInstance();
      // We create the new activity
      $result = $activityRepository->newActivity($activityDTO);
      // We echo the result of the creation
      echo $result;
    }
  }

}

// Otherwise, if we want to get elements :
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
    if ($_GET['type'] === 'hobby_activities') {
      echo json_encode($activityRepository->getHobbyActivities($_GET['hobbyId']));
    }
  }
}
