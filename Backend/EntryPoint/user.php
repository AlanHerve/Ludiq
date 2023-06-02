<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../DTOs/UserDTO.php");
include("../Repositories/UserRepository.php");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

}elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $body = file_get_contents('php://input');
    $data = json_decode($body,true);

    $id_user = 0;

    $function_to_call = $_GET['function_to_call'];
    $userRepository = UserRepository::getInstance();

    if(isset($data['id_user'])) $id_user = $data['id_user'];

    switch ($function_to_call) {
        case "findUserById": $userRepository->findUserById($id_user);
    }

}