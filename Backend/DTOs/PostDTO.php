<?php

require_once '../DTOs/UserDTO.php';
require_once '../DTOs/HobbyDTO.php';

class PostDTO
{
    public $id;
    public null|UserDTO $userDTO;
    public null|HobbyDTO $hobbyDTO;
    public array $images;

    public
      $description
    , $modified
    , $likes
    , $time;

    public function __construct($id, null|UserDTO $userDTO, null|HobbyDTO $hobbyDTO, $description, $images, $modified, $likes, $time)
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
