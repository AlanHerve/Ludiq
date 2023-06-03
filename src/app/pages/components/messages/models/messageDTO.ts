export class MessageDTO {
  constructor(public id: number,
              public id_sender: number,
              public id_receiver: number,
              public user_name: string,
              public user_username: string,
              public content: string,) {
  }
}
