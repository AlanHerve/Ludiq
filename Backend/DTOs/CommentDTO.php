<?php

require_once '../DTOs/UserDTO.php';
class CommentDTO
{
  public $id;
  public UserDTO $userDTO;
  public $content;
  public $postID;
  public $time;

  public function __construct($id, $userDTO, $content, $postID, $time)
  {
    $this->id = $id;
    $this->userDTO = $userDTO;
    $this->content = $content;
    $this->postID = $postID;
    $this->time = $time;
  }
}
