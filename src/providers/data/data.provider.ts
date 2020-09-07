import axios, {AxiosInstance} from 'axios'

export default abstract class DataProvider {

  protected axios: AxiosInstance

  protected constructor(path: string) {
    this.axios = axios.create({baseURL: process.env.VUE_APP_BACK_URL + path, withCredentials: true})
  }

}
