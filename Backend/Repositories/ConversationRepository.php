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

    public function getAllConversations($user_id) {
        $friends = $this->friendRepository->getAllFriends($user_id);
        $conversationsDTO = array();

        foreach ($friends as $friend) {
            $friendId = $friend->id;
            $messages = $this->messageRepository->getMessagesBetweenUsers($user_id, $friendId);
            $conversationDTO = new ConversationDTO($friend, $messages);
            $conversationsDTO[] = $conversationDTO;
        }

        return $conversationsDTO;
    }

}