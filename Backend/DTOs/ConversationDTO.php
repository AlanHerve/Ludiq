<?php

class ConversationDTO
{
    public $userDTO;
    public $messagesDTO;

    public function __construct($userDTO, $messagesDTO) {
        $this->userDTO = $userDTO;
        $this->messagesDTO = $messagesDTO;
    }
}