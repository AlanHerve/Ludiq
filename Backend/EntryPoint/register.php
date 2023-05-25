<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../DTOs/UserDTO.php");
include("../Repositories/UserRepository.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = file_get_contents('php://input');
    $data = json_decode($body,true);

    $name = $data['name'];
    $username = $data['username'];
    $email = $data['email'];
    $password = $data['password'];

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $userDTO = new UserDTO(null, $name, $username, $hashedPassword, $email, null);
    $userRepository = UserRepository::getInstance();
    $userRepository->registerUser($userDTO);
}
