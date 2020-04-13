import Vue from 'vue'
import {IonicVueRouter} from '@ionic/vue'
import routes from './routes'
import beforeEach from '@/router/beforeEach'

Vue.use(IonicVueRouter)

export default class Router extends IonicVueRouter {
  constructor() {
    super({mode: 'history', base: process.env.BASE_URL, routes})
    this.beforeEach(beforeEach)
  }
}

export const router = new Router()
