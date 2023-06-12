<?php

require_once '../DTOs/UserDTO.php';
require_once '../DTOs/ActivityDTO.php';

class ActivityParticipantsDTO
{
    public array $userDTO;
    public ActivityDTO $activityDTO;

    public function __construct($userDTO, $activityDTO) {
        $this->userDTO = $userDTO;
        $this->activityDTO = $activityDTO;
    }
}