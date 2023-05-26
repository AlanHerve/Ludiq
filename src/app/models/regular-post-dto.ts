export class RegularPostDto {

  constructor(public id_regular_post: string,
              public id_user: string,
              public id_hobby: string,
              public description: string,
              public images : (string | null)[],
              public modified: string,
              public likes: string,
              public time: string) {
  }
}
