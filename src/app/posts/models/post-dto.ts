import {UserDTO} from "../../models/user-dto";
import {HobbyDTO} from "../../models/hobby-dto";
import {PostComment} from "../components/comment/comment";

export class PostDTO {

  constructor(public id: number,
              public userDTO: UserDTO,
              public hobbyDTO: HobbyDTO,
              public description: string,
              public images : (string | null)[],
              public modified: number,
              public likes: number,
              public time: string,
              public files: File[],
              public comments: PostComment[]) {
  }
}
