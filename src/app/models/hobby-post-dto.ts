export class HobbyPostDTO {
  constructor(public id_user: number,
              public id_hobby: number,
              public frequency: string,
              public advancement: string,
              public availability: number) {
  }
}
