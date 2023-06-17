<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Content-Type');

require_once "../DTOs/UserDTO.php";
require_once "../Repositories/UserRepository.php";
require_once "../Repositories/ImageRepository.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $body = file_get_contents('php://input');
  $data = json_decode($body, true);

  $userDTOData = json_decode($_POST['userDTO'], true);
  $userId = $userDTOData['id'];
  $name = $userDTOData['name'];
  $username = $userDTOData['username'];
  $password = $userDTOData['password'];
  $email = $userDTOData['email'];

  $avatar_name = null;
  if(isset($_FILES['avatar'])) {
    $imageRepository = ImageRepository::getInstance();
    $avatar_name = $imageRepository->saveAvatar($_FILES['avatar']);
  }

  $userDTO = new UserDTO($userId, $name, $username, $password, $email, $avatar_name);

  $userRepository = UserRepository::getInstance();
  $userRepository->updateUser($userDTO);
}


