<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../Repositories/ConversationRepository.php");


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id_user = $_GET['id_user'];
    $conversationRepository = ConversationRepository::getInstance();
    echo json_encode($conversationRepository->getAllConversations($id_user));
}