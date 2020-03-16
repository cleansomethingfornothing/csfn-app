import UserRegistration from '@/types/UserRegistration'
import UserLogin from '@/types/UserLogin'
import User from '@/types/User'
import {AuthProvider} from '@/providers/auth/auth.provider'

export default class FirebaseAuthProvider implements AuthProvider {
  fetchUserId(): Promise<string> {
    return Promise.reject(null);
  }

  doLogin(user: UserLogin): Promise<User> {
    return Promise.resolve(user && undefined);
  }

  doLogout(): Promise<void> {
    return Promise.resolve();
  }

  doRegister(user: UserRegistration): Promise<User> {
    return Promise.resolve(user && undefined);
  }

  doResetPassword(email: string): Promise<void> {
    return Promise.resolve(email && undefined);
  }
}
