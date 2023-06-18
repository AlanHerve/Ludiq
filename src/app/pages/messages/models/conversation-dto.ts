import {MessageDTO} from "./message-dto";
import {FriendRequestDTO} from "../../../models/friend-request-dto";

/**
 * Store conversation
 * userDTO: other user in the conversation
 */
export class ConversationDTO {

  constructor(public userDTO: FriendRequestDTO, public messagesDTO: MessageDTO[]) {

  }
}
