<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, PUT');
header('Access-Control-Allow-Headers: Origin,Content-Type');

require_once('../Repositories/MessageRepository.php');
require_once ('../DTOs/MessageDTO.php');


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $type = $_GET['type'];
    if($type === 'between') {
        $user1 = $_GET['user1'];
        $user2 = $_GET['user2'];
        $messageRepository = MessageRepository::getInstance();
        // Calls the getMessageBetweenUsers method with the two users defined above
        echo json_encode($messageRepository->getMessagesBetweenUsers($user1, $user2));
    }
}elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $body = file_get_contents('php://input');
    $data = json_decode($body, true);
    // We create a new messageDTO using the data we have
    $messageDTO = new MessageDTO($data['id'], $data['id_user'], $data['id_user2'], $data['content'], $data['time']);
    // We create a new instance of MessageRepository
    $messageRepository = MessageRepository::getInstance();
    echo $messageRepository->createMessage($messageDTO);

}elseif ($_SERVER['REQUEST_METHOD'] === 'POST'){
  $body = file_get_contents('php://input');
  $data = json_decode($body, true);

  $id = $data["message_id"];

  $messageRepository = MessageRepository::getInstance();
  // Call the deleteMessage method
  echo $messageRepository->deleteMessage($id);
}
