<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../DTOs/HobbyDTO.php");
include("../Repositories/HobbyRepository.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

  $searchType = $_GET['searchType'];
  $searchTerm = $_GET['searchTerm'];
  if($searchType === 'hobby') {
    $hobbyRepository = HobbyRepository::getInstance();
    $hobbies = $hobbyRepository->findHobby($searchTerm);
    if($hobbies == null)
      echo $hobbies;
    else
      echo json_encode($hobbies);
  }
}
