<?php

require_once('../DTOs/UserDTO.php');
class ProfileDTO {
    public $userDTO;
    public int $numPosts;
    public int $numHobbies;
    public int $numFriends;
    public int $numActivities;
    public bool $activityDirector;
    /** @var PostDTO[] */
    public array $postsDTO;
    public array $hobbiesPostDTO;
    public array $activitiesDTO;

    public function __construct($userDTO, $numPosts, $numFriends, $numHobbies, $numActivities, $activityDirector, $postsDTO, $hobbiesPostDTO, $activitiesDTO)
    {
        $this->userDTO = $userDTO;
        $this->numPosts = $numPosts;
        $this->numHobbies = $numHobbies;
        $this->numFriends = $numFriends;
        $this->postsDTO = $postsDTO;
        $this->activitiesDTO = $activitiesDTO;
        $this->numActivities = $numActivities;
        $this->activityDirector = $activityDirector;
        $this->hobbiesPostDTO = $hobbiesPostDTO;
    }

}