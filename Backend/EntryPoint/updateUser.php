<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type');

require_once "../DTOs/UserDTO.php";
require_once "../Repositories/UserRepository.php";

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  $body = file_get_contents('php://input');
  $data = json_decode($body, true);

  $userId = $data['id'];
  $name = $data['name'];
  $username = $data['username'];
  $password = $data['password'];
  $email = $data['email'];
  $avatar = $data['avatar'];

  $userDTO = new UserDTO($userId, $name, $username, $password, $email, $avatar);

  $userRepository = UserRepository::getInstance();
  $userRepository->updateUser($userDTO);
}
