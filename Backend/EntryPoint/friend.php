<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../Repositories/FriendRepository.php");
include("../DTOs/HobbyPostDTO.php");


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $friendRepository = FriendRepository::getInstance();
    if(isset($_GET['user1']) && isset($_GET['user2'])) {
        $id_user1 = $_GET['user1'];
        $id_user2 = $_GET['user2'];
        echo json_encode($friendRepository->isFriendWidth($id_user1, $id_user2));
    }

    if(isset($_GET['user'])) {
        $id_user = $_GET['user'];
        echo json_encode($friendRepository->getAllFriends($id_user));
    }
}