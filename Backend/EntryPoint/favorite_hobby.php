<?php


header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id_user = $_GET['id_user'];
    $userRepository = UserRepository::getInstance();
    echo json_encode($userRepository->getFavoriteHobby($id_user));
}