<?php

require_once '../Database.php';

class ImageRepository
{
    private $db;
    private static $instance = null;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    public static function getInstance() {
        if(!self::$instance) {
            self::$instance = new ImageRepository();
        }
        return self::$instance;
    }

    public function createFile($imageName) {
        $imageFolder = '../assets/images/';
        $imagePath = $imageFolder . $imageName;

        if (file_exists($imagePath)) {
            // Getting the mime type of the image
            //$mimeType = mime_content_type($imagePath);
            // Send content of the image
            return readfile($imagePath);
        }
        else {
            return null;
        }
    }

}