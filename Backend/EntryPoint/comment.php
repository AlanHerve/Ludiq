<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin,Content-Type');

require_once '../Repositories/CommentRepository.php';
//if the user wants to post or delete a comment
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $body = file_get_contents('php://input');
  $data = json_decode($body, true);
  // get an instance of CommentRepository
  $commentRepository = CommentRepository::getInstance();
  // depending on the 'type' property, we either add a comment or delete one, passing the necessary data to methods in commentRepository
  switch ($data['type']){
    case "addComment": echo json_encode($commentRepository->addComment($data['comment']['userDTO'], $data['comment']['content'], $data['comment']['postID']));
      break;
    case "deleteComment": echo json_encode($commentRepository->deleteComment($data['id_comment']));
      break;
  }

}
// if we need to get the comments
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  // create an instance of CommentRepository
  $commentRepository = CommentRepository::getInstance();
  // we can either get all comments of a post
  if ($_GET['type'] == "all_comments") {
    echo json_encode($commentRepository->getAllComments($_GET['postID']));
  }
  // or only get three
  if ($_GET['type'] == "three_comments") {
    echo json_encode($commentRepository->getThreeComments($_GET['postID']));
  }
}


