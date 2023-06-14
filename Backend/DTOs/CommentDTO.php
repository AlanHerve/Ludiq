<?php

require_once '../DTOs/UserDTO.php';
class CommentDTO
{
    public $id;
    public UserDTO $userDTO;
    public $content;
    public $postID;
    public $time;
}