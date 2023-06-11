import {UserDTO} from "../../../../models/user-dto";
import {MessageDTO} from "./message-dto";
import {FriendRequestDTO} from "../../../../models/friend-request-dto";

export class ConversationDTO {

  constructor(public userDTO: FriendRequestDTO, public messagesDTO: MessageDTO[]) {

  }
}
