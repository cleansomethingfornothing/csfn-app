export default class User {
  //picture: string
  userName: string
  email: string

  constructor(/*picture: string, */ userName?: string, email?: string) {
    //this.picture = picture
    this.userName = userName
    this.email = email
  }
}
