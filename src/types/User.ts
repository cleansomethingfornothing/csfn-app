export default class User {
  picture: string
  username: string
  email: string

  constructor(username: string, email: string, picture: string) {
    this.picture = picture
    this.username = username
    this.email = email
  }
}
