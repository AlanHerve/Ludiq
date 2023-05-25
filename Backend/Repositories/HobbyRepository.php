<?php

require_once '../Database.php';
require_once '../DTOs/HobbyDTO.php';

class HobbyRepository
{
    private $db;
    private static $instance = null;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    public static function getInstance() {
        if(!self::$instance) {
            self::$instance = new HobbyRepository();
        }
        return self::$instance;
    }


}
