<?php

require_once '../Database.php';

class ImageRepository
{
  private $db;
  private static $instance = null;

  public function __construct()
  {
    $this->db = Database::getInstance()->getConnection();
  }

  public static function getInstance()
  {
    if (!self::$instance) {
      self::$instance = new ImageRepository();
    }
    return self::$instance;
  }

  /**
   * save multiple images
   * @param $images
   * @return array|null: uploaded files name
   */
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

  /**
   * save avatar / single image
   * @param $avatar
   * @return string|void|null
   */
  function saveAvatar($avatar)
  {
    //file to send image to
    $targetDir = '../assets/images/';

    if (!isset($avatar)) return null;

    // get the base name of the file
    $uniqueFilename = uniqid() . '_' . basename($avatar['name']);
    //determine the final path
    $targetFilePath = $targetDir . $uniqueFilename;

    //checks if uploading of the avatar has returned an error
    if (move_uploaded_file($avatar['tmp_name'], $targetFilePath)) {
      return $uniqueFilename;
    } else {
      echo 'Error while downloading file : ' . $avatar['tmp_name'] . '\n';
    }
  }

}
