import {PostDTO} from "../posts/models/post-dto";
import {ActivityDTO} from "../posts/models/activity-dto";

export class OrganizationDTO {
  constructor(public id_organization: number,
              public name_organization: String,
              public avatar: String,
              public description: String,
              public postsDTO: PostDTO[],
              public activitiesDTO: ActivityDTO[]) {
  }
}
