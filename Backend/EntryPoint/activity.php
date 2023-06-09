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

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if(isset($_GET['type'])) {
        if($_GET['type'] === 'top3') {
            $activityRepository = ActivityRepository::getInstance();
            echo json_encode($activityRepository->getTop3());
        }
    }
}



