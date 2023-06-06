<?php

class UserDTO {
    public $id;
    public $name;
    public $username;
    public $email;
    public $password;
    public $avatar;
    public $token;

    public function __construct($id, $name, $username, $password, $email, $avatar, $token = null) {
        $this->id = $id;
        $this->name = $name;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
        $this->avatar = $avatar;
        $this->token = $token;
    }
}