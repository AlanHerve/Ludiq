<?php

class UserDTO {
    public $name;
    public $username;
    public $email;
    public $password;

    public function __construct($name, $username, $email, $password) {
        $this->name = $name;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }
}