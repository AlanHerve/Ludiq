<?php

class HobbyPostDTO
{
    public $id_user; public $id_hobby; public $frequency; public $advancement; public $availability;

    public function __construct($id_user,$id_hobby,$frequency,$advancement,$availability){
        $this->id_user = $id_user;
        $this->id_hobby = $id_hobby;
        $this->frequency = $frequency;
        $this->advancement = $advancement;
        $this->availability = $availability;
    }
}