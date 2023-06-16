<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

require_once '../Repositories/CommentRepository.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $body = file_get_contents('php://input');
  $data = json_decode($body, true);
  $commentRepository = CommentRepository::getInstance();

  echo json_encode($commentRepository->addComment($data['userDTO']['id'], $data['content'], $data['postID']));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $commentRepository = CommentRepository::getInstance();
  if ($_GET['type'] == "all_comments") {
    echo json_encode($commentRepository->getAllComments($_GET['postID']));
  }
  if ($_GET['type'] == "three_comments") {
    echo json_encode($commentRepository->getThreeComments($_GET['postID']));
  }
}


