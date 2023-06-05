<?php

class HobbyCountDTO {
    public HobbyDTO $hobbyDTO;
    public int $count;

    public function __construct(HobbyDTO $hobbyDTO, int $count) {
        $this->hobbyDTO = $hobbyDTO;
        $this->count = $count;
    }
}