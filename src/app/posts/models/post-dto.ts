import {UserDTO} from "../../models/user-dto";
import {HobbyDTO} from "../../models/hobby-dto";

export class PostDTO {

  constructor(public id: number,
              public userDTO: UserDTO,
              public hobbyDTO: HobbyDTO,
              public description: string,
              public images_str : (string | null)[],
              public modified: number,
              public likes: number,
              public time: string,
              public images: (File | null)[]
  ) { }
}
