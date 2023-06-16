import {UserDTO} from "../../../models/user-dto";
import {ActivityDTO} from "../../../posts/models/activity-dto";

export class ActivityParticipantsDTO {

  constructor(public usersDTO: UserDTO[],
              public activityDTO: ActivityDTO) {
  }

}
