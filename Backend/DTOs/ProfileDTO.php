<?php

require_once('../DTOs/UserDTO.php');
require_once('../DTOs/HobbyDTO.php');
class ProfileDTO {
    public UserDTO $userDTO;
    public int $numPosts;
    public int $numHobbies;
    public int $numFriends;
    public int $numActivities;
    public $favoriteHobby;
    public bool $activityDirector;
    /** @var PostDTO[] */
    public array $postsDTO;
    public array $activitiesDTO;

    public function __construct($userDTO, $numPosts, $numFriends, $numHobbies, $numActivities, $activityDirector, $postsDTO, $activitiesDTO, $favoriteHobby)
    {
        $this->userDTO = $userDTO;
        $this->numPosts = $numPosts;
        $this->numHobbies = $numHobbies;
        $this->numFriends = $numFriends;
        $this->postsDTO = $postsDTO;
        $this->activitiesDTO = $activitiesDTO;
        $this->numActivities = $numActivities;
        $this->activityDirector = $activityDirector;
        $this->favoriteHobby = $favoriteHobby;
    }

}
