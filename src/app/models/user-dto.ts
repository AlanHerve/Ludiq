export class UserDTO {
  constructor(public id:number,
              public name: string,
              public username: string,
              public password?: string,
              public email?: string,
              public token?: string) {
  }
}
