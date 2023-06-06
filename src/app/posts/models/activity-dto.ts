export class ActivityDTO {
  constructor(
    public id_activity: number,
    public title: string,
    public id_user: number,
    public id_hobby: number,
    public description: string,
    public images : (string | null)[],
    public modified: number,
    public time: string,
    public files: File[]) {
  }
}
