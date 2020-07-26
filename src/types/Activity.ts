import {ArrayNotEmpty, IsNotEmpty, ValidateIf} from 'class-validator'
import Location from '@/types/Location'
import User from '@/types/User'
import {ActivityType} from '@/types/ActivityType'

export default class Activity {

  id?: string

  user?: User

  parent?: string

  type: ActivityType

  @IsNotEmpty({message: 'required-error-f'})
  description: string

  @IsNotEmpty({message: 'required-error-f'})
  location: Location

  @ValidateIf(o => o.type === ActivityType.cleanup)
  @IsNotEmpty({message: 'required-error-f'})
  date: Date

  @ArrayNotEmpty({message: 'select-some-picture'})
  pictures: string[] | Blob[] = []

  @ValidateIf(o => o.type === ActivityType.cleanup)
  @IsNotEmpty({message: 'required-error'})
  weight?: number

  @ValidateIf(o => o.type === ActivityType.cleanup)
  @IsNotEmpty({message: 'required-error'})
  volume?: number

  @ValidateIf(o => o.type === ActivityType.event)
  @IsNotEmpty({message: 'required-error'})
  title?: string

  @ValidateIf(o => o.type === ActivityType.event)
  @IsNotEmpty({message: 'required-error'})
  startDate?: Date

  @ValidateIf(o => o.type === ActivityType.event)
  @IsNotEmpty({message: 'required-error'})
  endDate?: Date

  @ValidateIf(o => o.type === ActivityType.event)
  @IsNotEmpty({message: 'required-error'})
  targetVolume?: number

  @ValidateIf(o => o.type === ActivityType.event)
  targetWeight?: number

  @ValidateIf(o => o.type === ActivityType.event)
  @IsNotEmpty({message: 'required-error'})
  radius?: number
}
