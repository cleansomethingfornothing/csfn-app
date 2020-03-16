import UserLogin from '@/types/UserLogin'
import UserRegistration from '@/types/UserRegistration'
import User from '@/types/User'
import FirebaseAuthProvider from '@/providers/auth/firebase.auth.provider'
import ServerAuthProvider from '@/providers/auth/server.auth.provider'

export interface AuthProvider {
  fetchUserId(): Promise<string>

  doRegister(user: UserRegistration): Promise<User>

  doLogin(user: UserLogin): Promise<User>

  doLogout(): Promise<void>

  doResetPassword(email: string): Promise<void>
}

export const authProvider = new ServerAuthProvider()
