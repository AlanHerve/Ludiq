import {UserDTO} from "../../models/user-dto";
import {HobbyDTO} from "../../models/hobby-dto";
import {CommentDTO} from "./comment-dto";

export class PostDTO {

  constructor(public id: number,
              public userDTO: UserDTO,
              public hobbyDTO: HobbyDTO,
              public description: string,
              public images_str : (string | null)[],
              public modified: number,
              public likes: number,
              public comments: CommentDTO[],
              public time: string,
              public images: (File | null)[]
  ) { }
}
