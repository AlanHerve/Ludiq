<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET,POST,OPTIONS');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../DTOs/UserDTO.php");
include("../Repositories/UserRepository.php");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = file_get_contents('php://input');
    $data = json_decode($body,true);

    echo $data['name'];

    $name = $data['name'];
    $username = $data['username'];
    $email = $data['email'];
    $password = $data['password'];


    $userDTO = new UserDTO($name, $username, $email, $password);
    $userRepository = new UserRepository();
    $userRepository->registerUser($userDTO);
}
