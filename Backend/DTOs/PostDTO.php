<?php

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
}

?>
