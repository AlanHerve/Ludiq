import {UserDTO} from "../../../../models/user-dto";

export class ProfileDTO {

  constructor(public userDTO: UserDTO,
              public numPosts: number,
              public numHobbies: number) {
  }
}
