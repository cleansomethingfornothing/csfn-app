import User from '@/types/User'
import { ArrayNotEmpty, IsNotEmpty } from 'class-validator'
import Location from '@/types/Location'
import Image from '@/types/Image'

export abstract class Activity {
  id?: number

  user?: User

  @IsNotEmpty({ message: 'required-error-f' })
  description: string

  @IsNotEmpty({ message: 'required-error-f' })
  location: Location

  @ArrayNotEmpty({ message: 'select-some-picture' })
  pictures: (string | Blob | Image)[] = []

}
