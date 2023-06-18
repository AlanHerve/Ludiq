import {UserDTO} from "../../../models/user-dto";
import {PostDTO} from "../../../posts/models/post-dto";
import {HobbyDTO} from "../../../models/hobby-dto";
import {ActivityDTO} from "../../../posts/models/activity-dto";
import {HobbyFlashcardDTO} from "../../../models/hobby-flashcard-dto";

/**
 * Information of a user
 */
export class ProfileDTO {

  constructor(public userDTO: UserDTO,
              public numPosts: number,
              public numHobbies: number,
              public numFriends: number,
              public numActivities: number,
              public activityDirector: boolean,
              public postsDTO: PostDTO[],
              public activitiesDTO: ActivityDTO[],
              public hobbiesPostDTO: HobbyFlashcardDTO[],
              public hobbiesDTO: HobbyDTO[],
              public favoriteHobby: HobbyDTO) {
  }
}
