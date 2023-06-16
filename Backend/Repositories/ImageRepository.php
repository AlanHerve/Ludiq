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

  function saveImages($images)
  {
    $targetDir = '../assets/images/';

    if (!isset($images)) return null;

    $uploadedFiles = [];
    for ($i = 0; $i < count($images['name']); $i++) {
      $uniqueFilename = uniqid() . '_' . basename($images['name'][$i]);
      $targetFilePath = $targetDir . $uniqueFilename;

      if (move_uploaded_file($images['tmp_name'][$i], $targetFilePath)) {
        $uploadedFiles[] = $uniqueFilename;
      } else {
        echo 'Error while downloading file : ' . $images['tmp_name'][$i] . '\n';
      }
    }
    return $uploadedFiles;
  }

}
