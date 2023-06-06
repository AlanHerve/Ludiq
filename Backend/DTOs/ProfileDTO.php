<?php

require_once('../DTOs/UserDTO.php');
class ProfileDTO {
    public UserDTO $userDTO;
    public int $numPosts;
    public int $numHobbies;
    public int $numFriends;
    /** @var PostDTO[] */
    public array $postsDTO;

    public array $hobbypostDTO;

    public function __construct($userDTO, $numPosts, $numFriends, $numHobbies, $postsDTO, $hobbypostDTO)
    {
        $this->userDTO = $userDTO;
        $this->numPosts = $numPosts;
        $this->numHobbies = $numHobbies;
        $this->numFriends = $numFriends;
        $this->postsDTO = $postsDTO;
        $this->hobbypostDTO = $hobbypostDTO;
    }

}