import {RequestDTO} from "./requestDTO";
import {HobbyDTO} from "./hobby-dto";

/**
 * Result of backend queries for hobbies
 * @hobbies : return of queries
 */
export class HobbyRequestDto{
  constructor(public hobbies: HobbyDTO[]) {
  }
}
