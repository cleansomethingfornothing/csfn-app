import {ArrayNotEmpty, IsNotEmpty, ValidateIf} from 'class-validator'
import Location from '@/types/Location'
import User from '@/types/User'

export default class Cleanup {

  id?: string

  user?: User

  @IsNotEmpty({message: 'required-error-f'})
  description: string

  @ValidateIf(o => o.done)
  @IsNotEmpty({message: 'required-error'})
  weight: number

  @IsNotEmpty({message: 'required-error-f'})
  location: Location

  @IsNotEmpty({message: 'required-error-f'})
  date: Date

  @IsNotEmpty({message: 'required-error'})
  done: boolean

  @ArrayNotEmpty({message: 'select-some-picture'})
  pictures: string[] | Blob[] = []

}
