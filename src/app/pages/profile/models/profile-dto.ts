import {UserDTO} from "../../../models/user-dto";
import {PostDTO} from "../../../posts/models/post-dto";
import {HobbyDTO} from "../../../models/hobby-dto";
import {ActivityDTO} from "../../../posts/models/activity-dto";

export class ProfileDTO {

  constructor(public userDTO: UserDTO,
              public numPosts: number,
              public numHobbies: number,
              public numFriends: number,
              public postsDTO: PostDTO[],
              public activitiesDTO: ActivityDTO[],
              public favoriteHobby?: HobbyDTO) {
  }
}
