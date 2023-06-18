import {UserDTO} from "../../models/user-dto";

/**
 * Informations of a comment
 * time: time posted or modified
 * userDTO: informations of user posting comment
 */
export class CommentDTO {
  constructor(
    public id: number,
    public userDTO: UserDTO,
    public content: string,
    public postID: number,
    public time: string
  ) {}
}
