import {IsEmail, IsNotEmpty, MinLength} from 'class-validator'
import {CREATE, LOGIN, UPDATE_EMAIL, UPDATE_PASSWORD} from '@/types/ValidationGroups'
import Image from '@/types/Image'

export default class User {

  id?: number

  @IsNotEmpty({message: 'required-error-f'})
  picture?: File | Image

  @IsNotEmpty({groups: [CREATE], message: 'required-error'})
  username?: string

  @IsEmail({}, {groups: [CREATE, LOGIN, UPDATE_EMAIL], message: 'invalid-email'})
  @IsNotEmpty({groups: [CREATE, UPDATE_EMAIL], message: 'required-error'})
  email?: string

  @IsNotEmpty({groups: [CREATE, LOGIN, UPDATE_PASSWORD, UPDATE_EMAIL], message: 'required-error-f'})
  @MinLength(4, {groups: [CREATE, UPDATE_PASSWORD], message: 'min-length-4'})
  password?: string

  creation?: Date
}
