import {UserDTO} from "../../models/user-dto";
import {HobbyDTO} from "../../models/hobby-dto";
import {OrganizationDTO} from "../../models/organization-dto";

/**
 * informations of an activity
 * time: time of the activity
 */
export class ActivityDTO {
  constructor(
    public id: number,
    public userDTO: UserDTO,
    public hobbyDTO: HobbyDTO,
    public title: string,
    public advancement: string,
    public description: string,
    public date_post: string,
    public time: string,
    public current_registered: number,
    public max_registrations: number,
    public images : (string | null)[],
    public id_organization: number,
    public organizationDTO: OrganizationDTO
    ) {
  }
}
