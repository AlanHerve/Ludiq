<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include ("../Repositories/HobbyRepository.php");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  $id = null;
  $body = file_get_contents('php://input');
  $data = json_decode($body,true);

  $function_to_call = $data['function_to_call'];


  if(isset($data['id_user'])) $id = $data['id_user'];

  $hobbyRepository = HobbyRepository::getInstance();

  switch ($function_to_call){
    case "fetchAllHobbies":
      $hobbyRepository->fetchAllHobbies();
      break;
    case "fetchDisplayHobbies":
      $hobbyRepository->fetchDisplayHobbies();
      break;
    case "fetchHobbiesOfUser":
      $hobbyRepository->fetchHobbiesOfUser($id);
      break;
  }

}elseif ($_SERVER['REQUEST_METHOD'] === 'GET'){

}

