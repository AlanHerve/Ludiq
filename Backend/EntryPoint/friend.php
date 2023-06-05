<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../Repositories/FriendRepository.php");
include("../DTOs/HobbyPostDTO.php");


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id_user = $_GET['user'];

    $friendRepository = FriendRepository::getInstance();
    echo $friendRepository->getAllFriends($id_user);
}