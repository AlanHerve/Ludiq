<?php

class HobbyDTO
{
  public $id;
  public $name;
  public $image;

  public function __construct($id, $name, $image){
    $this->id = $id;
    $this->name = $name;
    $this->image = $image;

  }
}
