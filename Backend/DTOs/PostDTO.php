<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");


require_once '../DTOs/UserDTO.php';
require_once '../DTOs/HobbyDTO.php';

class PostDTO
{
  public $id;
  public $userDTO;
  public $hobbyDTO;
  public $images;

  public
    $description
  , $modified
  , $likes
  , $comments
  , $time;

  public function __construct($id, $userDTO, $hobbyDTO, $description, $images, $modified = null, $likes = null, $time = null)
  {
    $this->id = $id;
    $this->userDTO = $userDTO;
    $this->hobbyDTO = $hobbyDTO;
    $this->description = $description;
    $this->images = $images;
    $this->modified = $modified;
    $this->likes = $likes;
    $this->time = $time;
  }

  public function setPostID($id){
    $this->id = $id;
  }

  public function setTime($time){
    $this->time = $time;
  }

}

?>
