<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

require_once ("../Repositories/HobbyRepository.php");
require_once ("../DTOs/HobbyPostDTO.php");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = file_get_contents('php://input');
    $data = json_decode($body, true);


    if(isset($data['id_user']) && isset($data['id_hobby']) && isset($data['frequency']) && isset($data['advancement']) && isset($data['availability'])){
        $hobbyPostDTO = new HobbyPostDTO(null,$data['id_user'], $data['id_hobby'], null,$data['frequency'], $data['advancement'], $data['availability']);
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
        case "getAllHobbies":
            $hobbyRepository->getAllHobbies();
            break;
        case "hobby_users":
            echo json_encode($hobbyRepository->getHobbyUsers($_GET['id_hobby']));
            break;
        case "fetchDisplayHobbies":
            $hobbyRepository->fetchDisplayHobbies();
            break;
        case "getHobbiesOfUser":
            echo json_encode($hobbyRepository->fetchHobbiesOfUser($id_user));
            break;
        case "fetchAvailableHobbiesOfUser":
            echo $hobbyRepository->fetchAvailableHobbiesOfUser($id_user);
            break;
        case "getHobbiesFlashcardsOfUser":
            echo json_encode($hobbyRepository->getHobbiesFlashcardsOfUser($id_user));
            break;
        case "destroyHobbyPost":
            $hobbyRepository->destroyHobbyPost($_GET["id_hobby_post"]);
            break;
        case "getHobbyById":
            echo $hobbyRepository->getHobbyById($_GET['id_hobby']);
            break;

    }

}elseif ($_SERVER["REQUEST_METHOD"] === "DELETE"){

}

