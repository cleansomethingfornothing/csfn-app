import {ArrayNotEmpty, IsNotEmpty} from 'class-validator'
import Location from '@/types/Location'
import User from '@/types/User'
import Image from '@/types/Image'

export default class Cleanup {

    id?: number

    user?: User

    @IsNotEmpty({message: 'required-error-f'})
    description: string

    @IsNotEmpty({message: 'required-error-f'})
    location: Location

    @IsNotEmpty({message: 'required-error-f'})
    date: Date

    @ArrayNotEmpty({message: 'select-some-picture'})
    pictures: (string | Blob | Image)[] = []

    weight?: number

    @IsNotEmpty({message: 'required-error'})
    volume?: number

}
