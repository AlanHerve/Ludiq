<?php

require_once '../DTOs/UserDTO.php';
require_once '../DTOs/ActivityDTO.php';

/**
 * Class corresponding to the participants of an activity
 */
class ActivityParticipantsDTO
{
  /*
   * In participants of an activity, we have the users
   */
  public array $usersDTO;
  /*
   * Participants of an activity are related to an activity
   */
  public ActivityDTO $activityDTO;

  public function __construct($usersDTO, $activityDTO)
  {
    $this->usersDTO = $usersDTO;
    $this->activityDTO = $activityDTO;
  }
}
