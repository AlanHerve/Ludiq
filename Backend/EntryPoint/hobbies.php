<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../Repositories/HobbyRepository.php");
include("../DTOs/HobbyPostDTO.php");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = file_get_contents('php://input');
    $data = json_decode($body, true);

    $hobbyPostDTO = null;
    if(isset($data['id_user']) && isset($data['id_hobby']) && isset($data['frequency']) && isset($data['advancement']) && isset($data['availability'])){
        $hobbyPostDTO = new HobbyPostDTO($data['id_user'], $data['id_hobby'], $data['frequency'], $data['advancement'], $data['availability']);
    }else{
        echo json_encode(array('success' => false, 'message'=>'parameters not found') );
        exit(0);
    }

    $hobbyRepository = HobbyRepository::getInstance();


    echo $hobbyRepository->newHobbyPost($hobbyPostDTO);



} elseif ($_SERVER["REQUEST_METHOD"] === 'GET') {

    $function_to_call = $_GET['function_to_call'];

    if(isset($_GET['id_user'])) $id_user = $_GET['id_user'];

    $hobbyRepository = HobbyRepository::getInstance();

    switch ($function_to_call) {
        case "fetchAllHobbies":
            $hobbyRepository->fetchAllHobbies();
            break;
        case "fetchDisplayHobbies":
            $hobbyRepository->fetchDisplayHobbies();
            break;
        case "fetchHobbiesOfUser":
            $hobbyRepository->fetchHobbiesOfUser($id_user);
            break;
        case "fetchAvailableHobbiesOfUser":
            echo $hobbyRepository->fetchAvailableHobbiesOfUser($id_user);
            break;
    }

}

