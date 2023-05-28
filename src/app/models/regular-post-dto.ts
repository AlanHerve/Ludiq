export class RegularPostDTO {

  constructor(public id_regular_post: number|null,
              public id_user: number|null,
              public id_hobby: number|null,
              public description: string,
              public images : (File | null)[],
              public modified: string,
              public likes: number,
              public time: string) {
  }
}
