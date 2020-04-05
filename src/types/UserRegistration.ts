import {IsEmail, IsNotEmpty, Validate} from 'class-validator'
import {PasswordConfirmation} from '@/tools/Validator'

export default class UserRegistration {
  
  @IsNotEmpty({message: 'required-error'})
  username: string

  @IsEmail({}, {message: 'invalid-email'})
  @IsNotEmpty({message: 'required-error'})
  email: string

  @IsNotEmpty({message: 'required-error-f'})
  password: string

  @IsNotEmpty({message: 'password-confirmation-required'})
  @Validate(PasswordConfirmation, {message: 'password-confirmation-error'})
  passwordConfirmation: string

  /*
  @IsNotEmpty({message: 'required-error-f'})
  picture: Blob
   */
}
