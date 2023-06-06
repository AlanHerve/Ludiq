export class HobbyPostDTO {
  constructor(public id_hobby_post:number,
              public id_user: number,
              public id_hobby: number,
              public frequency: string,
              public advancement: string,
              public availability: number,
              public hobby_name?: string) {
  }
}
