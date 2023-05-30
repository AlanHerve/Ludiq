/**
 * Hobby object
 * @id    : id of the hobby
 * @name  : name of the hobby
 * @image : default image for the hobby
 */
export class HobbyDTO {
  constructor(public id: number,
              public name: string,
              public image: string) {
  }
}
