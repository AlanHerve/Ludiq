<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include ("../Repositories/HobbyRepository.php");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  $body = file_get_contents('php://input');
  $data = json_decode($body,true);

  $function_to_call = $data['function_to_call'];

  $hobbyRepository = HobbyRepository::getInstance();

  switch ($function_to_call){
    case "fetchAllHobbies":
      $hobbyRepository->fetchAllHobbies();
      break;
    case "fetchDisplayHobbies":
      $json = $hobbyRepository->fetchDisplayHobbies();
      echo $json;
      break;

  }

}elseif ($_SERVER['REQUEST_METHOD'] === 'GET'){

}

