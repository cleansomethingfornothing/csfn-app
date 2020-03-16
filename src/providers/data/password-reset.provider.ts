import DataProvider from '@/providers/data/data.provider'
import {handleBackError} from '@/tools/handleBackError'

export class PasswordResetProvider extends DataProvider {

    constructor() {
        super('/password-reset')
    }

    request(email: string): Promise<void> {
        return this.http.post('/request', {email})
            .then(() => undefined)
            .catch(handleBackError('recover-password'))
    }
}

export const passwordResetProvider = new PasswordResetProvider()
