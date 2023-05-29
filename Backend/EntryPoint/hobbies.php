<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../Repositories/HobbyRepository.php");
include("../DTOs/HobbyPostDTO.php");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $id = null;
    $body = file_get_contents('php://input');
    $data = json_decode($body, true);

    $function_to_call = $data['function_to_call'];


    if (isset($data['id_user'])) $id = $data['id_user'];

    $HobbyPostDTO = null;
    if(isset($data['HobbyPostDTO']['id_user']) && isset($data['HobbyPostDTO']['id_hobby']) && isset($data['HobbyPostDTO']['frequency']) && isset($data['HobbyPostDTO']['advancement']) && isset($data['HobbyPostDTO']['availability'])){
        $HobbyPostDTO = new HobbyPostDTO($data['HobbyPostDTO']['id_user'], $data['HobbyPostDTO']['id_hobby'], $data['HobbyPostDTO']['frequency'], $data['HobbyPostDTO']['advancement'], $data['HobbyPostDTO']['availability']);
    }elseif($data['function_to_call']=="newHobbyPost"){
        echo json_encode(array('success'=>false, 'message'=>'parameters not fdound', "dto"=>$data['HobbyPostDTO']));
        exit(0);
    }


    $hobbyRepository = HobbyRepository::getInstance();

    switch ($function_to_call) {
        case "fetchAllHobbies":
            $hobbyRepository->fetchAllHobbies();
            break;
        case "fetchDisplayHobbies":
            $hobbyRepository->fetchDisplayHobbies();
            break;
        case "fetchHobbiesOfUser":
            $hobbyRepository->fetchHobbiesOfUser($id);
            break;
        case "fetchAvailableHobbiesOfUser":
            $hobbyRepository->fetchAvailableHobbiesOfUser($id);
            break;
        case "newHobbyPost" :
            $hobbyRepository->newHobbyPost($id, $HobbyPostDTO);
            break;

    }

} elseif ($_SERVER["REQUEST_METHOD"] === 'GET') {

}

