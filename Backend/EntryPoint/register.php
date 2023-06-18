<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

require_once("../DTOs/UserDTO.php");
require_once("../Repositories/UserRepository.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = file_get_contents('php://input');
    $data = json_decode($body,true);

    $userDTO = $data['userDTO'];

    $name = $userDTO['name'];
    $username = $userDTO['username'];
    $email = $userDTO['email'];
    $password = $userDTO['password'];
    $userType = $data['userType'];

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $userDTO = new UserDTO(null, $name, $username, $hashedPassword, $email, null);

    $userRepository = UserRepository::getInstance();
    echo json_encode($userRepository->registerUser($userDTO, $userType));
}
