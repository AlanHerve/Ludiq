import {PostDTO} from "../posts/models/post-dto";
import {ActivityDTO} from "../posts/models/activity-dto";

/**
 * Informations of an organisation
 * description: organization describing themselves in a few words
 * postsDTO: posts of activity_directors of this organisation
 * activitiesDTO: activities posted by activity_directors of this organization
 */
export class OrganizationDTO {
  constructor(public id_organization: number,
              public name_organization: string,
              public avatar: string,
              public description: string,
              public postsDTO: PostDTO[],
              public activitiesDTO: ActivityDTO[]) {
  }
}
