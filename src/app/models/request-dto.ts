import {HobbyPostDto} from "./hobby-post-dto";

export class RequestDto {
  constructor(public function_to_call:string, public id_user?: number, public hobbyPostDTO?: HobbyPostDto) {
  }
}
