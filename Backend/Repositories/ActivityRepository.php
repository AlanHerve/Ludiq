<?php
require_once '../Database.php';
require_once '../DTOs/ActivityDTO.php';
require_once '../Repositories/UserRepository.php';
require_once '../Repositories/HobbyRepository.php';

class ActivityRepository
{
    private static $instance = null;
    private $db;
    private $userRepository;
    private $hobbyRepository;
    //private $OrganizationRepository;

    public function __construct()
    {
        // Assign the database connection to the $db variable
        $this->db = Database::getInstance()->getConnection();

        // Initialize other repositories
        $this->hobbyRepository = HobbyRepository::getInstance();
        $this->userRepository = UserRepository::getInstance();
        //$this->OrganizationRepository = OrganizationRepository::getInstance();
    }

    // method to get an instance of ActivityRepository
    public static function getInstance()
    {
        if (!self::$instance) { //if the instance doesn't exist then create a new one
            self::$instance = new ActivityRepository();
        }
        return self::$instance; //return the instance
    }

    public function newActivity(ActivityDTO $activityDTO)
    {
        $id_user = $activityDTO->userDTO->id;
        $id_hobby = $activityDTO->hobbyDTO->id;
        $description = $activityDTO->description;
        $images = $activityDTO->images;

        $stmt = $this->db->prepare("INSERT INTO activity (ID_ACTIVITY_DIRECTOR, ID_HOBBY, DESCRIPTION , DATE_ACTIVITY , MAX_REGISTRATIONS,IMAGE) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("iissis", $id_activity_director, $id_hobby, $description, $time, $max_registrations, $images);
        $stmt->execute();
        //->inserer que ce qui n'a pas de valeur de base
        //iisssss -> int int string string string...
        //requetes pour aller chopper les bails à refaire

        if ($stmt->affected_rows > 0) { //if rows are affected it means the database has been modified
            $response = array(
                'success' => 'true'
            );
        } else { //if not, nothing has been added in the database, therefore there is a problem somewhere
            $response = array(
                'success' => 'false'
            );
        }

        return json_encode($response);
    }

    public function getTop3()
    {
        $stmt = $this->db->prepare("
            SELECT
	            act.ID_ACTIVITY
                , hob.HOBBY_NAME
                , COUNT(*)
            FROM
	            activity act
	            INNER JOIN hobby hob
	                ON hob.ID_HOBBY = act.ID_HOBBY
            GROUP BY
	            act.ID_HOBBY
                , hob.HOBBY_NAME
            ORDER BY
	            COUNT(*) DESC LIMIT 3
            ;
        ");
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $activitiesDTO = [];
            while($row = $result->fetch_assoc()){
                $activityDTO = $this->findActivityById($row['ID_ACTIVITY']);
                if($activityDTO)
                    $activitiesDTO[] = $activityDTO;
            }
            return $activitiesDTO;
        }
        return null;
    }

    private function findActivityById($id_activity) {
        $stmt = $this->db->prepare("
            SELECT
                act.*
            FROM
                activity act
            WHERE
                act.ID_ACTIVITY = ?
        ");
        $stmt->bind_param('i', $id_activity);
        $stmt->execute();
        $result = $stmt->get_result();
        if($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $userDTO = $this->userRepository->findUserById($row['ID_ACTIVITY_DIRECTOR']);
            $hobbyDTO = $this->hobbyRepository->findHobbyById($row['ID_HOBBY']);
            return new ActivityDTO( $row['ID_ACTIVITY'], $userDTO, $hobbyDTO, $row['ADVANCEMENT'], $row['DESCRIPTION'],
                                    $row['DATE_POST'], $row['DATE_ACTIVITY'], $row['CURRENT_REGISTERED'],
                                    $row['MAX_REGISTRATIONS'], null);
        }
        return null;
    }
}
