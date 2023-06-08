<?php
require_once '../DTOs/UserDTO.php';
require_once '../DTOs/HobbyDTO.php';

class ActivityDTO
{
  public $id;
  public $userDTO;
  public $hobbyDTO;
  public $images;
  public $OrganizationDTO;

  public
    $description,
    $max_registrations,
    $current_registered,
    $time, //date of the activity
    $advancement,
    $date_post;

  public function __construct($id, $OrganizationDTO, $hobbyDTO, $advancement, $description = null, $date_post = null, $time = null, $current_registered, $max_registrations, $images)
  {
    $this->id = $id;
    $this->OrganizationDTO = $OrganizationDTO;
    $this->hobbyDTO = $hobbyDTO;
    $this->advancement = $advancement;
    $this->description = $description;
    $this->date_post = $date_post;
    $this->time = $time;
    $this->current_registered = $current_registered;
    $this->max_registrations = $max_registrations;
    $this->images = $images;
  }
}



