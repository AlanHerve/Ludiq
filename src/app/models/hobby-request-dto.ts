import {RequestDTO} from "./requestDTO";
import {HobbyDTO} from "./hobby-dto";

export class HobbyRequestDto{
  constructor(public hobbies: HobbyDTO[], public top_hobbies: HobbyDTO[], public rand_hobbies: HobbyDTO[]) {
  }
}
