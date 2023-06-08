<?php

class HobbyPostDTO
{
    public $id_hobby_post; public $id_user; public $id_hobby; public $hobby_name; public $frequency; public $advancement; public $availability;

    public function __construct($id_hobby_post, $id_user,$id_hobby, $hobby_name, $frequency,$advancement,$availability){
        $this->id_hobby_post = $id_hobby_post;
        $this->id_user = $id_user;
        $this->id_hobby = $id_hobby;
        $this->hobby_name = $hobby_name;
        $this->frequency = $frequency;
        $this->advancement = $advancement;
        $this->availability = $availability;
    }
}