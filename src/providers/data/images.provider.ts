import DataProvider from '@/providers/data/data.provider'
import {handleBackError} from '@/tools/handleBackError'
import Image from '@/types/Image'
import {AxiosError} from 'axios'

export default class ImagesProvider extends DataProvider {

  constructor() {
    super('/images')
  }

  uploadImages(images: File[], action: string): Promise<Image[]> {
    return this.http.postFile('', images)
      .then(({data}) => data)
      .catch((error: AxiosError) => handleBackError(action)(error.response))
  }

}

export const imagesProvider = new ImagesProvider()
