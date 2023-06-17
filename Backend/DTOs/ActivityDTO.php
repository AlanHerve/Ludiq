<?php
require_once '../DTOs/UserDTO.php';
require_once '../DTOs/HobbyDTO.php';

class ActivityDTO
{
  public $userDTO;
  public $hobbyDTO;
  public $images;
  public $title;

  public
    $id,
    $description,
    $max_registrations,
    $current_registered,
    $time, //date of the activity
    $advancement,
    $date_post,
    $id_organization,
    $organizationDTO
    ;

  public function __construct($id, $userDTO, $hobbyDTO, $advancement, $description, $date_post, $time, $current_registered, $max_registrations, $images, $title, $id_organization, $organizationDTO)
  {
    $this->id = $id;
    $this->userDTO = $userDTO;
    $this->hobbyDTO = $hobbyDTO;
    $this->title = $title;
    $this->advancement = $advancement;
    $this->description = $description;
    $this->date_post = $date_post;
    $this->time = $time;
    $this->current_registered = $current_registered;
    $this->max_registrations = $max_registrations;
    $this->images = $images;
    $this->id_organization = $id_organization;
    $this->organizationDTO = $organizationDTO;
  }

  public function setID($id){
      $this->id = $id;
  }
}



