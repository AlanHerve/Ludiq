<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Origin,Content-Type');

include("../DTOs/RegularPostDTO.php");
include("../Repositories/RegularPostRepository.php");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {



  $body = file_get_contents('php://input');
  $data = json_decode($body,true);

  $id = null;
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
  
  $regularPostDTO = new RegularPostDTO($id ,$id_user, $id_hobby, $description, $images, $modified, $likes, $time);
  $regularPostRepository = RegularPostRepository::getInstance();
  $json = $regularPostRepository->newRegularPost($regularPostDTO);
  echo $json;

}elseif ($_SERVER['REQUEST_METHOD'] === 'GET'){

  $body = file_get_contents('php://input');
  $data = json_decode($body,true);

  $id_user = null;
  $id_hobby = null;
  $description = null;
  $images = null;
  $modified = null;
  $likes = null;
  $time = null;

  $mode = null;
  $valid = false;

  if(isset($data['singleton'])){

  }else{
    if (isset($data['userPage']) && isset($data['id_user'])){
      $id_user = $data['id_user'];
      $mode = $data['userPage'];
      $valid = true;

    }elseif (isset($data['search']) && isset($data['id_hobby'])){
      $id_hobby = $data['id_hobby'];
      $mode = $data['search'];
      $valid = true;

    }
    if($valid){

      $regularPostDTO = new RegularPostDTO($id_user, $id_hobby, $description, $images, $modified, $likes, $time);
      $regularPostRepository = RegularPostRepository::getInstance();
      $regularPostRepository->getPosts($mode, $regularPostDTO);

    }


  }


}

?>
