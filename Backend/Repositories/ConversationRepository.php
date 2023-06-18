<?php

require_once '../DTOs/UserDTO.php';
require_once '../DTOs/ConversationDTO.php';
require_once '../Repositories/UserRepository.php';
require_once '../Repositories/FriendRepository.php';
require_once '../Repositories/MessageRepository.php';
class ConversationRepository {
    private static $instance = null;
    private FriendRepository $friendRepository;
    private MessageRepository $messageRepository;

    public function __construct()
    {
        $this->friendRepository = FriendRepository::getInstance();
        $this->messageRepository = MessageRepository::getInstance();
    }

    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new ConversationRepository();
        }
        return self::$instance;
    }

    public function getAllConversations($userId) {
        $friends = $this->friendRepository->getAllFriends($userId);
        $conversationsDTO = array();

        if(!$friends) return [];

        foreach ($friends as $friend) {
            $friendId = $friend->user->id;
            if($this->friendRepository->acceptedFriendship($userId, $friendId)) {
                $messages = $this->messageRepository->getMessagesBetweenUsers($userId, $friendId);
                $conversationDTO = new ConversationDTO($friend, $messages);
                $conversationsDTO[] = $conversationDTO;
            }
        }

        if(count($conversationsDTO) > 0) return $conversationsDTO;
        return [];
    }

}
