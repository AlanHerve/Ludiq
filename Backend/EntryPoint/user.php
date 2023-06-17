<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type');

include("../DTOs/HobbyDTO.php");
include("../Repositories/UserRepository.php");


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if(isset($_GET['type'])) {
    $userRepository = UserRepository::getInstance();
    if($_GET['type'] == 'is_part_of_organization') {
      echo json_encode($userRepository->isPartOfAnOrganization($_GET['userId']));
    }
    return;
  }

  $user_id = $_GET['user_id'];

  $userRepository = UserRepository::getInstance();
  echo json_encode($userRepository->findUserById($user_id));

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $body = file_get_contents('php://input');
  $data = json_decode($body, true);

  if(isset($data['update_user'])) {
    updateUser($data['update_user']);
  }
}

function updateUser($userData) {
  $userDTO = new UserDTO(
    $userData['id'],
    $userData['name'],
    $userData['username'],
    $userData['email'],
    $userData['password'],
    $userData['avatar'],
    $userData['token']
  );

  $userRepository = UserRepository::getInstance();
  echo json_encode($userRepository->updateUser($userDTO));
}

?>
