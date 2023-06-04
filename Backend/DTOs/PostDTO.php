<?php

class PostDTO {

  public $id, $user_name, $user_username, $id_user, $id_hobby
  , $description
  , $images
  , $modified
  , $likes
  , $time
  , $comments;

  public function __construct($id, $user_name, $user_username, $id_user, $id_hobby, $description
    , $images, $modified, $likes, $time, $comments) {

    $this->id = $id;
    $this->id_user = $id_user;
    $this->user_name = $user_name;
    $this->user_username = $user_username;
    $this->id_hobby = $id_hobby;
    $this->description = $description;
    $this->images = $images;
    $this->modified = $modified;
    $this->likes = $likes;
    $this->time = $time;
    $this->comments = $comments;

  }



}

?>
