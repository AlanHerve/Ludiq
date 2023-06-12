<?php

require_once '../DTOs/UserDTO.php';
require_once '../DTOs/ActivityDTO.php';

class ActivityParticipantsDTO
{
    public array $usersDTO;
    public ActivityDTO $activityDTO;

    public function __construct($usersDTO, $activityDTO) {
        $this->usersDTO = $usersDTO;
        $this->activityDTO = $activityDTO;
    }
}