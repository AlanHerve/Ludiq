export class PostDTO {

  constructor(public id_regular_post: number,
              public user_name: string,
              public user_username: string,
              public id_user: number,
              public id_hobby: number,
              public hobby_name: string,
              public description: string,
              public images : (string | null)[],
              public modified: number,
              public likes: number,
              public time: string,
              public files: File[]) {
  }
}
