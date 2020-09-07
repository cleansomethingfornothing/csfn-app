import DataProvider from '@/providers/data/data.provider'
import {handleBackError} from '@/tools/handleBackError'
import Image from '@/types/Image'

export default class ImagesProvider extends DataProvider {

  constructor() {
    super('/images')
  }

  uploadImages(images: File[]): Promise<Image[]> {
    const data = new FormData()

    images.forEach((image) => data.append('images', image, 'profile.jpg'))

    return this.axios.post('/', data)
      .then(({data}) => data)
      .catch(handleBackError)
  }

}

export const imagesProvider = new ImagesProvider()
