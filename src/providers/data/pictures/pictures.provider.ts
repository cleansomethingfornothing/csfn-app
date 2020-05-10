import {AxiosInstance} from 'axios'

export default class PicturesProvider {

  axios: AxiosInstance

  constructor(axios) {
    this.axios = axios
  }

  uploadPictures(pictures: Blob[]): Promise<string> {
    return Promise.resolve(undefined)
  }

  removePictures(pictures: string[]): Promise<void> {
    return Promise.resolve()
  }

}
