export class PostDTO {
  constructor(
    public id_regular_post: number | null,
    public user_name: string,
    public user_username: string,
    public id_user: number | null,
    public id_hobby: number | null,
    public description: string,
    public images: (string | null)[],
    public modified: number,
    public likes: number,
    public time: string,
    public files: File[],
    public comments: string[]
  ) {}
}
