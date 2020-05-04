import HomePage from '@/views/pages/HomePage.vue'
import LoginPage from '@/views/pages/LoginPage.vue'
import RegisterPage from '@/views/pages/RegisterPage.vue'
import ForgottenPasswordPage from '@/views/pages/ForgottenPasswordPage.vue'
import PublishPage from '@/views/pages/EditionPage.vue'
import CleanupPage from '@/views/pages/CleanupPage.vue'
import UserPage from '@/views/pages/UserPage.vue'
import SettingsPage from '@/views/pages/SettingsPage.vue'

export default [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
      public: true,
      statusBarColor: '#C6D7B3'
    }
  }, {
    public: true,
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
    meta: {
      public: true,
      statusBarColor: '#C6D7B3'
    }
  }, {
    public: true,
    path: '/forgotten-password',
    name: 'ForgottenPasswordPage',
    component: ForgottenPasswordPage,
    meta: {
      public: true,
      statusBarColor: '#C6D7B3'
    }
  }, {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: {
      statusBarColor: '#FFFFFF'
    }
  }, {
    path: '/user/:id',
    name: 'User',
    component: UserPage,
    meta: {
      statusBarColor: '#FFFFFF'
    }
  }, {
    path: '/cleanup/:id',
    name: 'Cleanup',
    component: CleanupPage,
    meta: {
      statusBarColor: '#FFFFFF'
    }
  }, {
    path: '/publish',
    name: 'Publish',
    component: PublishPage,
    meta: {
      statusBarColor: '#FFFFFF'
    }
  }, {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage,
    meta: {
      statusBarColor: '#FFFFFF'
    }
  }
]
