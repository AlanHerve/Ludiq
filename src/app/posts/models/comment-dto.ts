import {UserDTO} from "../../models/user-dto";

export class CommentDTO {
  constructor(
    public id: number,
    public userDTO: UserDTO,
    public content: string,
    public time: string
  ) {}
}
