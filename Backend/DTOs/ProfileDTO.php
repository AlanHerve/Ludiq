<?php

require_once('../DTOs/UserDTO.php');
class ProfileDTO {
    public UserDTO $userDTO;
    public int $numPosts;
    public int $numHobbies;

}