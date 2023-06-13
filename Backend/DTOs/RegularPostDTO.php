<?php

class RegularPostDTO {

  public $id, $id_user, $id_hobby
  , $description
  , $images
  , $modified
  , $likes
  , $time;

  public function __construct($id, $id_user, $id_hobby, $description
    , $images, $modified, $likes, $time) {

    $this->id = $id;
    $this->id_user = $id_user;
    $this->id_hobby = $id_hobby;
    $this->description = $description;
    $this->images = $images;
    $this->modified = $modified;
    $this->likes = $likes;
    $this->time = $time;

  }



}

?>
