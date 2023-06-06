<?php

class HobbyPostDTO
{
    public $id_user; public $id_hobby; public $id_hobby_post; public $frequency; public $advancement; public $availability;

    public function __construct($id_user,$id_hobby, $id_hobby_post,$frequency,$advancement,$availability){
        $this->id_user = $id_user;
        $this->id_hobby = $id_hobby;
        $this->id_hobby_post = $id_hobby_post;
        $this->frequency = $frequency;
        $this->advancement = $advancement;
        $this->availability = $availability;
    }
}