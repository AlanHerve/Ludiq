<?php

require_once('../DTOs/ProfileDTO.php');
require_once('../Repositories/UserRepository.php');
require_once('../Repositories/PostRepository.php');
require_once('../Repositories/HobbyRepository.php');
require_once('../Repositories/FriendRepository.php');
require_once('../Repositories/ActivityRepository.php');

class ProfileRepository
{
  private static $instance = null;

  private $userRepository;
  private $postRepository;
  private $hobbyRepository;
  private $friendRepository;
  private $activityRepository;

  public function __construct()
  {
    $this->userRepository = UserRepository::getInstance();
    $this->postRepository = PostRepository::getInstance();
    $this->hobbyRepository = HobbyRepository::getInstance();
    $this->friendRepository = FriendRepository::getInstance();
    $this->activityRepository = ActivityRepository::getInstance();
  }

  public static function getInstance()
  {
    if (!self::$instance) {
      self::$instance = new ProfileRepository();
    }
    return self::$instance;
  }

  public function getProfileInformation($id_user)
  {
    $userDTO = $this->userRepository->findUserById($id_user);
    if(!$userDTO) return null;
    $numPosts = $this->postRepository->getNumPosts($id_user);
    $numHobbies = $this->hobbyRepository->getNumHobbies($id_user);
    $postsDTO = $this->postRepository->getUserPosts($id_user);
    $numFriends = $this->friendRepository->getNumFriends($id_user);
    $activitiesDTO = $this->activityRepository->getUserActivities($id_user);
    $favoriteHobby = $this->userRepository->getFavoriteHobby($id_user);

    if ($this->userRepository->isActivityDirector($id_user)) {
      $activityDirector = true;
      $numActivities = $this->activityRepository->getNumActivitiesDirector($id_user);
    } else {
      $activityDirector = false;
      $numActivities = $this->activityRepository->getNumActivitiesClassical($id_user);
    }

    return new ProfileDTO($userDTO, $numPosts, $numFriends, $numHobbies, $numActivities, $activityDirector, $postsDTO, $activitiesDTO, $favoriteHobby);
  }

}
