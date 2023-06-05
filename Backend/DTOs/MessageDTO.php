<?php

class MessageDTO
{
    public $id, $id_user, $id_user2, $content, $time;

    public function __construct($id, $id_user, $id_user2, $content, $time) {
        $this->id = $id;
        $this->id_user = $id_user;
        $this->id_user2 = $id_user2;
        $this->content = $content;
        $this->time = $time;
    }
}