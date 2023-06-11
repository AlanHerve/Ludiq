import {UserDTO} from "./user-dto";

export class FriendRequestDTO{
  constructor(public user: UserDTO, public status: number, public requester: number) {
  }
}
