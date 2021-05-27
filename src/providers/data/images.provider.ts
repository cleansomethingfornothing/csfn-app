import DataProvider from '@/providers/data/data.provider'
import { handleBackError } from '@/tools/handleBackError'
import Image from '@/types/Image'
import { AxiosError } from 'axios'

export default class ImagesProvider extends DataProvider {

  constructor() {
    super('/images')
  }

  uploadImages(images: File[],
               action: string): Promise<Image[]> {
    return images.length ? this.http.postFile('', images)
      .then(({ data }) => data)
      .catch((error: AxiosError) => handleBackError(action)(error.response)) : Promise.resolve([])
  }

  removeImage(id: number): Promise<void> {
    return this.http.delete('/' + id)
  }
}

export const imagesProvider = new ImagesProvider()
