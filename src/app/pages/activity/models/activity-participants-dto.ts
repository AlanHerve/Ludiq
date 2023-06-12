import {UserDTO} from "../../../models/user-dto";
import {ActivityDTO} from "../../../posts/models/activity-dto";

export class ActivityParticipantsDTO {

  constructor(public userDTO: UserDTO,
              public activityDTO: ActivityDTO) {
  }

}
