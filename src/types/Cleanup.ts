import { IsNotEmpty } from 'class-validator'
import { Activity } from '@/types/Activity'

export default class Cleanup extends Activity {

  @IsNotEmpty({ message: 'required-error-f' })
  date: Date

  @IsNotEmpty({ message: 'required-error' })
  weight?: number

  @IsNotEmpty({ message: 'required-error' })
  volume?: number

}
