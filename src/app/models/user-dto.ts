export class UserDTO {
  constructor(public name: string,
              public username: string,
              public email: string,
              public password: string,
              public token?: string) {
  }
}
