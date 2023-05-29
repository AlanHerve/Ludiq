import {HobbyDTO} from "./hobby-dto";

/**
 * Class that represents a hobby on the right bar of the website. It is composed of a HobbyDTO and its posts' count corresponding to this hobby
 */
export class HobbyCountDTO {
  constructor(public hobbyDTO: HobbyDTO,
              public count: number) {}
}
