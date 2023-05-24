<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Origin,Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {



  $body = file_get_contents('php://input');
  $data = json_decode($body,true);

  $id_user = $data['id_user'];
  $id_hobby = $data['id_hobby'];
  $description = $data['description'];
  $images = $data['images'];
  $modified = null;
  $likes = null;
  $time = null;

  if(isset($data['modified'])){
    $modified = $data['modified'];
  }

  $regularPostDTO = new RegularPostDTO($id_user, $id_hobby, $description, $images, $modified, $likes, $time);
  $regularPostRepository = RegularPostRepository::getInstance();
  $regularPostRepository->newRegularPost($regularPostDTO);


}

?>
