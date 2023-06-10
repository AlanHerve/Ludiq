import {UserDTO} from "../../../../models/user-dto";
import {MessageDTO} from "./message-dto";

export class ConversationDTO {

  constructor(public userDTO: UserDTO, public messagesDTO: MessageDTO[]) {

  }
}
