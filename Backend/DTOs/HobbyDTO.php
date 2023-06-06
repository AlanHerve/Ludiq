<?php

class HobbyDTO
{
  public $id;
  public $name;
  public $image;

  public function __construct($id, $name = null, $image = null){
    $this->id = $id;
    $this->name = $name;
    $this->image = $image;

  }
}
