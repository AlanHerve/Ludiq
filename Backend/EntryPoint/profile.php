<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../Repositories/ProfileRepository.php");


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $profileRepository = ProfileRepository::getInstance();
    $organization = false;
    if(isset($_GET['token'])) {
        $token = true;
    }
    echo json_encode($profileRepository->getProfileInformation($_GET['id_user']));
}
