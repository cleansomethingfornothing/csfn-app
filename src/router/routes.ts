import HomePage from '@/views/pages/HomePage.vue'
import LoginPage from '@/views/pages/LoginPage.vue'
import RegisterPage from '@/views/pages/RegisterPage.vue'
import ForgottenPasswordPage from '@/views/pages/ForgottenPasswordPage.vue'
import EditionPage from '@/views/pages/EditionPage.vue'
import CleanupPage from '@/views/pages/CleanupPage.vue'
import UserPage from '@/views/pages/UserPage.vue'
import SettingsPage from '@/views/pages/SettingsPage.vue'
import UserActivitiesPage from '@/views/pages/UserActivitiesPage.vue'

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
    redirect: '/home/community'
  }, {
    path: '/home',
    redirect: '/home/community'
  }, {
    path: '/home/:tab',
    name: 'HomePage',
    component: HomePage
  }, {
    path: '/user/:id',
    name: 'User',
    component: UserPage
  }, {
    path: '/user-activities',
    name: 'UserActivities',
    component: UserActivitiesPage
  }, {
    path: '/cleanup/:id',
    name: 'Cleanup',
    component: CleanupPage
  }, {
    path: '/publish',
    name: 'Publish',
    component: EditionPage
  }, {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage
  }
]
