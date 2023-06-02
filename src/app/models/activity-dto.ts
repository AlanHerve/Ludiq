export class ActivityDTO {
    constructor(
        public id_activity: number|null,
        public id_user: number|null,
        public id_hobby: number|null,
        public images : (File | null)[],
        public modified: string,
        public time: string) {
}
}
