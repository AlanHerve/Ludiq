import {HobbyCountDTO} from "./hobby-count-dto";
import {HobbyDTO} from "./hobby-dto";

/**
 * Result of backend queries for hobbies
 * @hobbies : return of queries
 */
export class HobbyRequestDTO{
  constructor(public hobbies: HobbyCountDTO[]) {
  }
}
