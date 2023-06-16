<?php

class UserDTO {
    public $id;
    public $name;
    public $username;
    public $email;
    public $password;
    public $avatar;
    public $token;

    public function __construct($id, $name, $username, $password = null, $email = null, $avatar = null, $token = null) {
        $this->id = $id;
        $this->name = $name;
        $this->username = $username;
        $this->password = $password;
        $this->email = $email;
        $this->avatar = $avatar;
        $this->token = $token;
    }
}
