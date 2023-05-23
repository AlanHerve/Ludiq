<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../DTOs/UserDTO.php");
include("../Repositories/UserRepository.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = file_get_contents('php://input');
    $data = json_decode($body,true);

    $username = $data['username'];
    $password = $data['password'];
    $userDTO = new UserDTO('', $username, '', $password);

    $userRepository = new UserRepository();
    $json = $userRepository->loginUser($userDTO);
    echo $json;
}