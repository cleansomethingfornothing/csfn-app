import User from '@/types/User'
import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import {store} from '@/store/index'
import {userProvider} from '@/providers/data/user.provider'
import {authProvider} from '@/providers/data/auth.provider'
import {imagesProvider} from '@/providers/data/images.provider'

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
  fetchCurrentUser() {
    return authProvider.fetchCurrentUser()
      .then((user) => {
        this.setCurrentUser(user)
      })
  }

  @Action
  updateUserPicture(picture) {
    return imagesProvider.uploadImages([picture as File], 'update-profile')
      .then((images) => this.updateUser({picture: {id: images[0].id}}))
  }

  @Action
  updateUser(user: User) {
    return userProvider.updateUser(this.currentUser.id, user)
      .then((user) => {
        this.setCurrentUser(user)
      })
  }
}

export const userModule = new UserModule()
