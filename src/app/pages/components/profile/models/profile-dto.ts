import {UserDTO} from "../../../../models/user-dto";
import {PostDTO} from "../../../../posts/models/post-dto";

export class ProfileDTO {

  constructor(public userDTO: UserDTO,
              public numPosts: number,
              public numHobbies: number,
              public numFriends: number,
              public postsDTO: PostDTO[]) {
  }
}
