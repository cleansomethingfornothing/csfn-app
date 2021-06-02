import { IsAlphanumeric, IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { CREATE, LOGIN, RESET_PASSWORD, UPDATE, UPDATE_EMAIL, UPDATE_PASSWORD } from '@/types/ValidationGroups'
import Image from '@/types/Image'

export default class User {

  id?: number

  @IsNotEmpty({ message: 'required-error-f', groups: [CREATE] })
  picture?: File | Image

  @IsNotEmpty({ groups: [CREATE, UPDATE], message: 'required-error' })
  @IsAlphanumeric(undefined, { groups: [CREATE], message: 'alphanumeric-error-short' })
  @IsAlphanumeric(undefined, { groups: [UPDATE], message: 'alphanumeric-error' })
  username?: string

  @IsEmail({}, { groups: [CREATE, LOGIN, UPDATE_EMAIL, RESET_PASSWORD], message: 'invalid-email' })
  @IsNotEmpty({ groups: [CREATE, UPDATE_EMAIL, RESET_PASSWORD], message: 'required-error' })
  email?: string

  @MinLength(4, { groups: [CREATE, UPDATE_PASSWORD], message: 'min-length-4' })
  @IsNotEmpty({ groups: [CREATE, LOGIN, UPDATE_PASSWORD, UPDATE_EMAIL], message: 'required-error-f' })
  password?: string

  creation?: Date

  country?: string

  totalCleanups?: number

  totalWeight?: number

  totalVolume?: number

  firstCleanup?: Date
}
