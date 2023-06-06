<?php

require_once('../Database.php');
require_once('../DTOs/ProfileDTO.php');
require_once('../Repositories/UserRepository.php');
require_once('../Repositories/PostRepository.php');
require_once('../Repositories/HobbyRepository.php');
require_once('../Repositories/FriendRepository.php');

class ProfileRepository
{
    private $db;
    private static $instance = null;

    private $userRepository;
    private $postRepository;
    private $hobbyRepository;
    private $friendRepository;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
        $this->userRepository = UserRepository::getInstance();
        $this->postRepository = PostRepository::getInstance();
        $this->hobbyRepository = HobbyRepository::getInstance();
        $this->friendRepository = FriendRepository::getInstance();
    }
    public static function getInstance() {
        if(!self::$instance) {
            self::$instance = new ProfileRepository();
        }
        return self::$instance;
    }

    public function getProfileInformation($id_user)
    {
        $numPosts = $this->postRepository->getNumPosts($id_user);
        $numHobbies = $this->hobbyRepository->getNumHobbies($id_user);
        $userDTO = $this->userRepository->findUserById($id_user);
        $userPosts = $this->postRepository->getUserPosts($id_user);
        $numFriends = $this->friendRepository->getNumFriends($id_user);
        $hobbyPostsDTO = $this->postRepository->getHobbiesFlashcardsOfUser($id_user);



        return new ProfileDTO($userDTO, $numPosts, $numHobbies, $numFriends, $userPosts, $hobbyPostsDTO);

    }

}
