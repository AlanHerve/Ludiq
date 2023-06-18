<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

require_once ("../Repositories/HobbyRepository.php");
require_once ("../DTOs/HobbyPostDTO.php");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = file_get_contents('php://input');
    $data = json_decode($body, true);

  $hobbyRepository = HobbyRepository::getInstance();

    if($data['type'] == "newHobbyPost"){
      if(isset($data['hobbyPostDTO']['id_user']) && isset($data['hobbyPostDTO']['id_hobby']) && isset($data['hobbyPostDTO']['frequency']) && isset($data['hobbyPostDTO']['advancement']) && isset($data['hobbyPostDTO']['availability'])){
        $hobbyPostDTO = new HobbyPostDTO(null,$data['hobbyPostDTO']['id_user'], $data['hobbyPostDTO']['id_hobby'], null,$data['hobbyPostDTO']['frequency'], $data['hobbyPostDTO']['advancement'], $data['hobbyPostDTO']['availability']);
      }else{
        echo json_encode(array('success' => false, 'message'=>'parameters not found') );
        exit(0);
      }



      echo $hobbyRepository->newHobbyPost($hobbyPostDTO);
    }elseif($data['type'] == "setFavoriteHobby"){

      echo $hobbyRepository->setFavoriteHobby($data['hobbyDTO'] , $data['id_user']);
    }





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

