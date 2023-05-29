import {RequestDTO} from "./request-dto";
import {HobbyDTO} from "./hobby-dto";

/**
 * Result of backend queries for hobbies
 * @hobbies : return of queries
 */
export class HobbyRequestDTO{
  constructor(public hobbies: HobbyDTO[]) {
  }
}
