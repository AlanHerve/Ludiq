<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../Repositories/ProfileRepository.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $profileRepository = ProfileRepository::getInstance();
    // Organization will be false by default
    $organization = false;
    if(isset($_GET['token'])) {
        $token = true;
    }
    // Retrieves profile information for a specified used with its ID
    echo json_encode($profileRepository->getProfileInformation($_GET['id_user']));
}
