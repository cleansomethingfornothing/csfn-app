import HomePage from '@/views/pages/home/HomePage.vue'
import LoginPage from '@/views/pages/auth/LoginPage.vue'
import RegisterPage from '@/views/pages/auth/RegisterPage.vue'
import ForgottenPasswordPage from '@/views/pages/auth/ForgottenPasswordPage.vue'
import EditionPage from '@/views/pages/edition/EditionPage.vue'
import ActivityPage from '@/views/pages/ActivityPage.vue'
import UserPage from '@/views/pages/UserPage.vue'
import SettingsPage from '@/views/pages/settings/SettingsPage.vue'
import UserActivitiesPage from '@/views/pages/home/user/UserActivitiesPage.vue'
import GlobalImpactPage from '@/views/pages/home/community/GlobalImpactPage.vue'
import SecuritySettingsPage from '@/views/pages/settings/SecuritySettingsPage.vue'
import WelcomePage from '@/views/pages/auth/WelcomePage.vue'
import ProfileSettingsPage from '@/views/pages/settings/ProfileSettingsPage.vue'
import CleanupsMapPage from '@/views/pages/home/community/CleanupsMapPage.vue'
import LevelsPage from '@/views/pages/home/user/LevelsPage.vue'
import {RouteConfig} from 'vue-router'
import {ActivityType} from '@/types/ActivityType'

const routes: RouteConfig[] = [
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage,
        meta: {
            public: true
        }
    }, {
        path: '/register',
        name: 'RegisterPage',
        component: RegisterPage,
        meta: {
            public: true
        }
    }, {
        path: '/forgotten-password',
        name: 'ForgottenPasswordPage',
        component: ForgottenPasswordPage,
        meta: {
            public: true
        }
    }, {
        path: '/welcome',
        name: 'WelcomePage',
        component: WelcomePage
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
        path: '/levels',
        name: 'LevelsPage',
        component: LevelsPage
    }, {
        path: '/map',
        name: 'CleanupsMapPage',
        component: CleanupsMapPage
    }, {
        path: '/user/:id',
        name: 'UserPage',
        component: UserPage
    }, {
        path: '/current-user-cleanups',
        name: 'CurrentUserCleanups',
        component: UserActivitiesPage,
        props: {
            type: 'cleanup'
        }
    }, {
        path: '/current-user-alerts',
        name: 'CurrentUserAlerts',
        component: UserActivitiesPage,
        props: {
            type: 'alert'
        }
    }, {
        path: '/current-user-events',
        name: 'CurrentUserEvents',
        component: UserActivitiesPage,
        props: {
            type: 'event'
        }
    }, {
        path: '/cleanup/:id',
        name: 'CleanupPage',
        component: ActivityPage
    }, {
        path: '/edit-cleanup',
        name: 'CleanupEditionPage',
        component: EditionPage,
        props: {
            type: ActivityType.cleanup
        }
    }, {
        path: '/settings',
        name: 'SettingsPage',
        component: SettingsPage
    }, {
        path: '/global-impact',
        name: 'GlobalImpactPage',
        component: GlobalImpactPage
    }, {
        path: '/security-settings',
        name: 'SecuritySettingsPage',
        component: SecuritySettingsPage
    }, {
        path: '/profile-settings',
        name: 'ProfileSettingsPage',
        component: ProfileSettingsPage
    }
]
export default routes
