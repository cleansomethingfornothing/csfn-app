export default class Address {
  city: string
  state: string
  country: string
  countryCode: string


  constructor(city: string, state: string, country: string, countryCode: string) {
    this.city = city
    this.state = state
    this.country = country
    this.countryCode = countryCode
  }
}

