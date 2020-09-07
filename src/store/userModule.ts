import User from '@/types/User'
import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import {store} from '@/store/index'
import {userProvider} from '@/providers/data/user.provider'

@Module
class UserModule extends VuexModule {

  currentUser: User = null
  viewingUser: User = null

  constructor() {
    super({store, name: 'user'})
  }

  get getCurrentUser(): User {
    return this.currentUser
  }

  get getViewingUser(): User {
    return this.viewingUser
  }

  @Mutation
  setCurrentUser(user: User) {
    this.currentUser = user
  }

  @Mutation
  setViewingUser(user: User) {
    this.viewingUser = user
  }

  @Action
  fetchViewingUser(id: string) {
    if (id === this.currentUser.username) {
      this.setViewingUser(this.currentUser)
      return Promise.resolve()
    }
    return userProvider.fetchUser()
      .then((user) => {
        this.setViewingUser(user)
      })
  }

  @Action
  fetchCurrentUser(id: string) {
    return userProvider.fetchUser()
      .then((user) => {
        this.setCurrentUser(user)
      })
  }

}

export const userModule = new UserModule()
