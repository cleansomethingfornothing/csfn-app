import {ArrayNotEmpty, IsNotEmpty, ValidateIf} from 'class-validator'
import Location from '@/types/Location'
import User from '@/types/User'

export default class Activity {

  id?: string

  user?: User

  parent?: string

  type: 'cleanup' | 'alert' | 'event'

  @IsNotEmpty({message: 'required-error-f'})
  description: string

  @IsNotEmpty({message: 'required-error-f'})
  location: Location

  @IsNotEmpty({message: 'required-error-f'})
  date: Date

  @ArrayNotEmpty({message: 'select-some-picture'})
  pictures: string[] | Blob[] = []

  @ValidateIf(o => o.type === 'cleanup')
  @IsNotEmpty({message: 'required-error'})
  kilos: number

  @ValidateIf(o => o.type === 'cleanup')
  @IsNotEmpty({message: 'required-error'})
  liters: number

  @ValidateIf(o => o.type === 'event')
  @IsNotEmpty({message: 'required-error'})
  title: string

  @ValidateIf(o => o.type === 'event')
  @IsNotEmpty({message: 'required-error'})
  goal: number

  @ValidateIf(o => o.type === 'event')
  @IsNotEmpty({message: 'required-error'})
  radius: number
}
