import HomePage from '@/views/pages/HomePage.vue'
import LoginPage from '@/views/pages/LoginPage.vue'
import RegisterPage from '@/views/pages/RegisterPage.vue'
import ForgottenPasswordPage from '@/views/pages/ForgottenPasswordPage.vue'
import PublishPage from '@/views/pages/PublishPage.vue'
import CleanupPage from '@/views/pages/CleanupPage.vue'
import UserPage from '@/views/pages/UserPage.vue'
import SettingsPage from '@/views/pages/SettingsPage.vue'

export default [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
      public: true
    }
  }, {
    public: true,
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
    meta: {
      public: true
    }
  }, {
    public: true,
    path: '/forgotten-password',
    name: 'ForgottenPasswordPage',
    component: ForgottenPasswordPage,
    meta: {
      public: true
    }
  }, {
    path: '/',
    name: 'HomePage',
    component: HomePage
  }, {
    path: '/user/:id',
    name: 'user',
    component: UserPage
  }, {
    path: '/cleanup/:id',
    name: 'Cleanup',
    component: CleanupPage
  }, {
    path: '/publish',
    name: 'Publish',
    component: PublishPage
  }, {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage
  }
]
