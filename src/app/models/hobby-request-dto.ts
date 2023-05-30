import {HobbyCountDTO} from "./hobby-count-dto";

/**
 * Result of backend queries for hobbies
 * @hobbies : return of queries
 */
export class HobbyRequestDTO{
  constructor(public hobbies: HobbyCountDTO[]) {
  }
}
