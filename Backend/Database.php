<?php

class Database {
  private static $instance = null;
  private $conn;
  private $host = 'localhost';
  private $user = 'root';
  private $password = 'root';
  private $name = 'ludiq';

  private function __construct() {
    $this->conn = mysqli_connect($this->host, $this->user, $this->password, $this->name);
  }

    /**
     * Singleton syntax in order to  only have 1 instance of the database
     *
     * @return Database|null
     */
  public static function getInstance() {
    if(!self::$instance) {
      self::$instance = new Database();
    }
    return self::$instance;
  }

  public function getConnection() {
    return $this->conn;
  }
}
