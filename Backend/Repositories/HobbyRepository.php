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

    public function fetchAllHobbies() {

      $hobbies = [];
      $response = null;

      $stmt = $this->db->prepare("SELECT * FROM hobby");
      $stmt->execute();
      $result = $stmt->get_result();

      if($result){
        if($result->num_rows>0){
          while ($row = $result->fetch_assoc()) array_push($hobbies, new HobbyDTO($row["ID_HOBBY"], $row["HOBBY_NAME"], $row["IMAGE"]));
          $response = array(
            'success' => true,
            'hobbies' => $hobbies
          );
        }else{
          $result = array(
            'success' => false,
            'message' => 'Hobby table empty'
          );
        }
      }else{
        $response = array(
          'success' => false,
          'message' => 'Could not fetch hobbies'
        );
      }
      echo json_encode($response);

    }

    /**
     * @return : top 3 most popular hobbies and 3 random hobbies
     */
    public function fetchDisplayHobbies() {

        // store top 3 hobbies
        $top_hobbies = [];

        // stor 3 random hobbies
        $rand_hobbies = [];

        $response = null;

        // top 3 most popular hobbies
        $stmt = $this->db->prepare(
            "SELECT
	                  activity.`ID_HOBBY`
                    , hobby.`HOBBY_NAME`
                    , COUNT(*)
                FROM
	                  activity
	                  INNER JOIN
    	                  hobby ON hobby.ID_HOBBY = activity.ID_HOBBY
                GROUP BY
	                  activity.ID_HOBBY
                    , hobby.HOBBY_NAME
                ORDER BY
	                  COUNT(*) DESC LIMIT 3");
        $stmt->execute();
        $result = $stmt->get_result();

        if($result){
            if ($result->num_rows > 0){

                while ($row = $result->fetch_assoc()) array_push($top_hobbies, new HobbyDTO($row["ID_HOBBY"], $row["HOBBY_NAME"],  null));
                if ($result->num_rows == 3){
                    // if number of rows == 3 there's a chance there is more than 3 hobbies

                    // select 3 random hobbies, those hobbies won't be part of the top 3 most popular hobbies
                    $stmt = $this->db->prepare(
              "SELECT DISTINCT
                        activity.`ID_HOBBY`
                        , hobby.`HOBBY_NAME`
                    FROM
	                      activity
	                      INNER JOIN
    	                      hobby ON hobby.ID_HOBBY = activity.ID_HOBBY
                    WHERE
                        activity.`ID_HOBBY` NOT IN (?, ?, ?)
                    ORDER BY RAND() LIMIT 3");
                    $stmt->bind_param("iii", $top_hobbies[0]->id, $top_hobbies[1]->id, $top_hobbies[2]->id);
                    $stmt->execute();
                    $result = $stmt->get_result();

                    if($result) {
                        if($result->num_rows > 0) {
                            while ($row = $result->fetch_assoc()) array_push($rand_hobbies, new HobbyDTO($row["ID_HOBBY"], $row["HOBBY_NAME"], null));
                            $response = array(
                                'success'      => true,
                                'hobbies'  => array_merge($top_hobbies, $rand_hobbies)
                                //'rand_hobbies' => $rand_hobbies
                            );
                         }else{
                            $response = array(
                                'success'     => true,
                                'hobbies' => $top_hobbies
                            );
                        }
                    }else{
                            $response = array(
                                'success'      => true,
                                'hobbies'  => $top_hobbies,
                                'message' => 'could not fetch random hobbies'
                            );
                    }
                }else{
                    $response = array(
                        'success'      => true,
                        'hobbies'  => $top_hobbies,
                        'message' => 'not enough'
                    );
                 }
            }else{
                $response = array(
                    'success' => false,
                    'message' => 'Hobby table empty'
                );
             }
        }else{
            $response = array(
            'success' => false,
            'message' => 'Error fetching data from table'
            );
        }
        echo json_encode($response);
    }

    function fetchHobbiesOfUser($id) {
        $hobbies = [];
        $user_ID = $id;

        $response= null;

        $stmt = $this->db->prepare(
            "SELECT 
	                    hobby_post.`ID_HOBBY`
                        , hobby_post.`EXPERIENCE`
                        , hobby_post.`AVAILABLE`
                        , hobby_post.`FREQUENCY`
                        , hobby.`HOBBY_NAME`
                    FROM 
	                    hobby_post 
                        INNER JOIN
	                        hobby ON hobby.`ID_HOBBY` = hobby_post.`ID_HOBBY`
                    WHERE 
	                    hobby_post.`ID_USER` = ?");

        $stmt->bind_param("i", $user_ID);
        $stmt->execute();

        $result = $stmt->get_result();

        if($result){
            if($result->num_rows > 0){
                while ($row = $result->fetch_assoc()) array_push($hobbies , new HobbyDTO($row["ID_HOBBY"], $row["HOBBY_NAME"], null));
                $response = array(
                    'success' => true,
                    'hobbies' => $hobbies
                );
            }else{
                $response = array(
                    'success' => true,
                    'id' => $user_ID,
                    'message' => 'this user does not have any hobby'
                );
            }
        }else{
            $response = array(
                'success' => false,
                'message' => 'could not access table'
            );
        }
        echo json_encode($response);
    }


}
