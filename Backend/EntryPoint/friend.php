<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../Repositories/FriendRepository.php");
include("../DTOs/HobbyPostDTO.php");


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $friendRepository = FriendRepository::getInstance();

    $id_user1 = null;
    $id_user2 = null;

    if(isset($_GET['user1'])){
        $id_user1 = $_GET['user1'];
        if(isset($_GET['user2'])) $id_user2 = $_GET['user2'];

        $function_to_call = $_GET['function_to_call'];

        switch ($function_to_call){
            case 'getAllFriends':
                $to_echo = $friendRepository->getAllFriends($id_user1);
                break;
            case 'isFriendWith':
                $to_echo = $friendRepository->isFriendWith($id_user1, $id_user2);
                break;
        }
        echo json_encode($to_echo);
    }


}elseif($_SERVER['REQUEST_METHOD'] === 'POST') {

    $body = file_get_contents('php://input');
    $data = json_decode($body, true);

    $friendRepository = FriendRepository::getInstance();

    if(isset($data['user1'])){
        $id_user1 = $data['user1'];

        if(isset($data['user2'])) $id_user2 = $data['user2'];


            $function_to_call = $data['function_to_call'];

            switch ($function_to_call){
                case "addFriend":
                    $to_echo = $friendRepository->addFriend($id_user1, $id_user2);
                    break;
                case "removeFriend":
                    $to_echo = $friendRepository->removeFriend($id_user1, $id_user2);
                    break;
                case "acceptFriendship":
                    $to_echo = $friendRepository->acceptFriendship($id_user1, $id_user2);
                    break;
            }


        echo json_encode($to_echo);

    }
}