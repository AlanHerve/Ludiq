<?php

class ImageRepository
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

    public function findImagesOnLocalStorage($strings)
    {
        $files = [];
        foreach($strings as $string) {
          $file = '../assets/images/'.$string;
          if(file_exists($file)) {
            $fileContent = file_get_contents($file);

            $files[] = $fileContent;
          }
        }
        return $files;
    }

}