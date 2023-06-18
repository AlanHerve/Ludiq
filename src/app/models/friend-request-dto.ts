import {UserDTO} from "./user-dto";

/**
 * Information on friendship status between two users, relationship
 * status: friendship accepted or still waitig
 */
export class FriendRequestDTO{
  constructor(public user: UserDTO, public status: number, public requester: number) {
  }
}
