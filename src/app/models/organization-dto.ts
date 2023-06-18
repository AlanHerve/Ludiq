import {PostDTO} from "../posts/models/post-dto";
import {ActivityDTO} from "../posts/models/activity-dto";

export class OrganizationDTO {
  constructor(public id_organization: number,
              public name_organization: string,
              public avatar: string,
              public description: string,
              public postsDTO: PostDTO[],
              public activitiesDTO: ActivityDTO[]) {
  }
}
