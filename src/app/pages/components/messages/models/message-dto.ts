export class MessageDTO {
  constructor(public id: number,
              public id_user: number,
              public id_user2: number,
              public content: string,
              public time: string) {
  }
}
