export default class User {
  //picture: string
  firstName: string
  lastName: string
  userName: string
  email: string

  constructor(/*picture: string, */firstName?: string, lastName?: string, userName?: string, email?: string) {
    //this.picture = picture
    this.firstName = firstName
    this.lastName = lastName
    this.userName = userName
    this.email = email
  }
}
