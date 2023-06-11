<?php

class FriendRequestDTO
{

    public $user;
    public $status;
    public $requester;

    public function __construct(UserDTO $user, $status, $requester){
        $this->user = $user;
        $this->status = $status;
        $this->requester = $requester;
    }
}