<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../Repositories/ConversationRepository.php");


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Retrieve the user ID
    $id_user = $_GET['id_user'];
    // create a new instance for ConversationRepository
    $conversationRepository = ConversationRepository::getInstance();
    // Fetch all conversations  for the given user ID
    echo json_encode($conversationRepository->getAllConversations($id_user));
}
