import {HobbyFlashcardDTO} from "./hobby-flashcard-dto";

export class RequestDTO {
  constructor(public function_to_call:string, public id_user?: number, public HobbyPostDTO?: HobbyFlashcardDTO) {
  }
}