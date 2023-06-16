<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

require_once '../Repositories/CommentRepository.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = file_get_contents('php://input');
    $data = json_decode($body, true);
    $commentRepository = CommentRepository::getInstance();

    echo json_encode($commentRepository->addComment($data['id_user'], $data['content'], $data['id_regular_post']));
}
