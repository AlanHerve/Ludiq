export class ActivityDTO {
    constructor(
        public id_activity: number|null,
        public id_user: number|null,
        public id_hobby: number|null,
        public description: string,
        public images : (string | null)[],
        public modified: string,
        public time: string,
        public files: File[]) {
  }
}
