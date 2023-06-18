<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

require_once("../DTOs/UserDTO.php");
require_once("../Repositories/UserRepository.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = file_get_contents('php://input');
    $data = json_decode($body,true);

    $username = $data['username'];
    $password = $data['password'];
    $userDTO = new UserDTO(null,'', $username, $password, '', null);

    $userRepository = UserRepository::getInstance();
    $json = $userRepository->loginUser($userDTO);
    echo $json;
}
