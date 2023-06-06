<?php

require_once('../Database.php');

class ProfileRepository
{
    private $db;
    private static $instance = null;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    public static function getInstance() {
        if(!self::$instance) {
            self::$instance = new ProfileRepository();
        }
        return self::$instance;
    }

    public function getNumPosts($id_user) {
        $stmt = $this->db->prepare("
            SELECT
                COUNT(*)    AS num_posts
            FROM
                regular_post reg
            WHERE
                reg.ID_USER = ?
            ;
        ");
        $stmt->bind_param("i", $id_user);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row['num_posts'];
    }
    public function getNumHobbies($id_user) {
        $stmt = $this->db->prepare("
            SELECT
                COUNT(*)    AS num_hobbies
            FROM
                hobby_post hob
            INNER JOIN user u
                ON u.ID_USER = hob.ID_USER
            WHERE
                u.ID_USER = ?
            ;
        ");
        $stmt->bind_param("i", $id_user);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row['num_hobbies'];
    }

}