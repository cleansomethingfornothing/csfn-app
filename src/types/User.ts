export default class User {
  //picture: string
  username: string
  email: string

  constructor(/*picture: string, */ username?: string, email?: string) {
    //this.picture = picture
    this.username = username
    this.email = email
  }
}
