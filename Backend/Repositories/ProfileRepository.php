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


  /**
   * get all informations needed for a user's profile page
   * @param $id_user
   * @return ProfileDTO|null
   */
  public function getProfileInformation($id_user)
  {
    //get information of user
    $userDTO = $this->userRepository->findUserById($id_user);
    //if could not find anything
    if(!$userDTO) return null;

    //counts the number of post of a user
    $numPosts = $this->postRepository->getNumPosts($id_user);
    //counts the number of hobbies of a user
    $numHobbies = $this->hobbyRepository->getNumHobbies($id_user);
    //get all posts of a user
    $postsDTO = $this->postRepository->getUserPosts($id_user);
    //get the number of friends
    $numFriends = $this->friendRepository->getNumFriends($id_user);
    //get activites a user has posted as an activity director as well as activities the user is taking part in
    $activitiesDTO = $this->activityRepository->getUserActivities($id_user);
    //get the favorite hobby of the user
    $favoriteHobby = $this->userRepository->getFavoriteHobby($id_user);
    //fetch all the hobbis of an user
    $hobbies = $this->hobbyRepository->fetchHobbiesOfUser($id_user);
    //get all the flashcards of an user
    $hobbiesPostDTO = $this->hobbyRepository->getHobbiesFlashcardsOfUser($id_user);

    //if user is activity director, get the number of activities they organized
    if ($this->userRepository->isActivityDirector($id_user)) {
      $activityDirector = true;
      $numActivities = $this->activityRepository->getNumActivitiesDirector($id_user);
    } else {
      //otherwise get the number of activities they are taking part in
      $activityDirector = false;
      $numActivities = $this->activityRepository->getNumActivitiesClassical($id_user);
    }
    return new ProfileDTO($userDTO, $numPosts, $numFriends, $numHobbies, $numActivities, $activityDirector, $postsDTO, $activitiesDTO, $favoriteHobby, $hobbies, $hobbiesPostDTO);
  }

}
