<?php

class Database {
  private static $instance = null;
  private $conn;
  private $host = 'localhost';
  private $user = 'root';
  private $password = '';
  private $name = 'ludiq';

  private function __construct() {
    $this->conn = mysqli_connect($this->host, $this->user, $this->password, $this->name);
  }

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
