import {IsNotEmpty} from 'class-validator'

export default class UserLogin {
  @IsNotEmpty({message: 'required-error'})
  email: string

  @IsNotEmpty({message: 'required-error-f'})
  password: string
}
