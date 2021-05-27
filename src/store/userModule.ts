import User from '@/types/User'
import {Action, Module, Mutation, VuexModule} from 'vuex-class-modules'
import {store} from '@/store/index'
import {userProvider} from '@/providers/data/user.provider'
import {authProvider} from '@/providers/data/auth.provider'
import {imagesProvider} from '@/providers/data/images.provider'
import Cleanup from '@/types/Cleanup'
import {cleanupsProvider} from '@/providers/data/cleanups.provider'
import levels from '@/assets/levels'
import {UserLevel} from '@/types/UserLevel'
import UserProfileStats from '@/types/UserProfileStats'
import {statsProvider} from '@/providers/data/stats.provider'
import moment from 'moment'
import {Plugins} from "@capacitor/core";

const {FirebaseAnalytics} = Plugins;

@Module
class UserModule extends VuexModule {

    currentUser: User = null
    viewingUser: User = null
    loadingUserActivities = false
    currentUserCleanups: Cleanup[] = []
    loadingUserStats = false
    currentUserStats: UserProfileStats[] = []

    constructor() {
        super({store, name: 'user'})
    }

    get getCurrentUser(): User {
        return this.currentUser
    }

    get getCurrentUserLevel(): UserLevel {
        return levels.filter(level =>
            this.currentUser.totalCleanups < level.threshold.cleanups
            || this.currentUser.totalVolume < level.threshold.liters
            || this.currentUser.totalWeight < level.threshold.kilos)[0]
    }

    get getViewingUser(): User {
        return this.viewingUser
    }

    get isLoadingUserActivities() {
        return this.loadingUserActivities
    }

    get getCurrentUserCleanups(): Cleanup[] {
        return this.currentUserCleanups
    }

    get isLoadingUserStats(): boolean {
        return this.loadingUserStats
    }

    get getCurrentUserStats(): UserProfileStats[] {
        return this.currentUserStats
    }

    get statsGroupBy(): 'month' | 'day' {
        return moment().diff(this.currentUser.firstCleanup, 'months') > 3
            ? 'month'
            : 'day'
    }

    @Mutation
    setCurrentUser(user: User) {
        this.currentUser = user
    }

    @Mutation
    setViewingUser(user: User) {
        this.viewingUser = user
    }

    @Mutation
    setLoadingUserActivities(value: boolean) {
        this.loadingUserActivities = value
    }

    @Mutation
    setCurrentUserCleanups(cleanups: Cleanup[]) {
        this.currentUserCleanups = cleanups
    }

    @Mutation
    setLoadingUserStats(value: boolean) {
        this.loadingUserStats = value
    }

    @Mutation
    setCurrentUserStats(stats: UserProfileStats[]) {
        this.currentUserStats = stats
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
    fetchCurrentUserCleanups() {
        this.setLoadingUserActivities(true)
        return cleanupsProvider.fetchUserCleanups(this.currentUser.id)
            .then((cleanups) => {
                this.setCurrentUserCleanups(cleanups)
                this.setLoadingUserActivities(false)
            })
            .catch((err) => {
                this.setLoadingUserActivities(false)
                return Promise.reject(err)
            })
    }

    @Action
    fetchCurrentUserStats() {
        if (!this.currentUser.firstCleanup)
            return Promise.resolve()

        this.setLoadingUserStats(true)
        return statsProvider.fetchUserStats(this.currentUser.id, this.statsGroupBy)
            .then((stats) => {
                this.setLoadingUserStats(false)
                this.setCurrentUserStats(stats)
            })
            .catch((err) => {
                this.setLoadingUserActivities(false)
                return Promise.reject(err)
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
                FirebaseAnalytics.logEvent({name: 'update_profile', params: {fields: Object.keys(user)}})
                this.setCurrentUser(user)
            })
    }
}

export const userModule = new UserModule()
