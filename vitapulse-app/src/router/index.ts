import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/useUser'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/homePage.vue'),
    meta: {title: 'Home'}
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/registerPage.vue'),
    meta: { title: 'Register', requiresGuest: true},
  },
  {
    path: '/verification/:token',
    name: 'verification',
    component: () => import('@/views/VerificationPage.vue'),
    meta: { title: 'Verification', requiresGuest: true},
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/loginPage.vue'),
    meta: { title: 'Sign in', requiresGuest: true,},
  },
  {
    path: '/verification',
    name: 'verification',
    component: () => import('@/views/VerificationPage.vue'),
    meta: { title: 'Verification', requiresGuest: true, },
  },
  {
    path: '/verification/:token',
    component: () => import('@/views/tokenVerified.vue'),
    meta: { title: 'Verification', requiresGuest: true, },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/resetPassword.vue'),
    meta: { title: 'password reset', requiresGuest: true, },
  },
  {
    path: '/reset-password/:token',
    component: () => import('@/views/resetPassForm.vue'),
    meta: { title: 'password reset form', requiresGuest: true, },
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/auth/dashboardPage.vue'),
    meta: { title: 'Dashboard', requiresAuth: true, requiresVerified: true}
  },
  {
    path: '/anomaly',
    name: 'anomaly',
    component: () => import('@/views/auth/user/ZScore.vue'),
    meta: { title: 'Anomaly', requiresAuth: true, requiresVerified: true }
  },
  {
    path: '/alerts',
    name: 'alerts',
    component: () => import('@/views/auth/user/alerts.vue'),
    meta: { title: 'Alert', requiresAuth: true, requiresVerified: true }
  },
  {
    path: '/guidelines',
    name: 'guidelines',
    component: () => import('@/views/guidelinesPage.vue'),
    meta: { title: 'Guidelines', requiresAuth: true, requiresVerified: true }
  },
  {
    path: '/activity-user',
    name: 'activiy-user',
    component: () => import('@/views/auth/activityLogs.vue'),
    meta: { title: 'Activity logs', requiresAuth: true, requiresVerified: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/auth/profileSettings.vue'),
    meta: { title: 'Settings', requiresAuth: true, requiresVerified: true }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/auth/admin/dashboard.vue'),
    meta: { title: 'Admin dashboard', requiresAuth: true, requiresAdmin: true, requiresVerified: true }
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/auth/admin/users.vue'),
    meta: { title: 'Users', requiresAuth: true, requiresAdmin: true, requiresVerified: true }
  },
  {
    path: '/admin-list',
    name: 'admin-list',
    component: () => import('@/views/auth/admin/admins.vue'),
    meta: { title: 'Admins', requiresAuth: true, requiresAdmin: true, requiresVerified: true }
  },
  {
    path: '/historical-admin',
    name: 'historical-admin',
    component: () => import('@/views/auth/admin/analytics/HistoricalData.vue'),
    meta: { title: 'Historical Data', requiresAuth: true, requiresAdmin: true, requiresVerified: true }
  },
  {
    path: '/z-score-admin',
    name: 'z-score-admin',
    component: () => import('@/views/auth/admin/analytics/ZscroesData.vue'),
    meta: { title: 'Z-score', requiresAuth: true, requiresAdmin: true, requiresVerified: true }
  },
  {
    path: '/users-alerts',
    name: 'users-alerts',
    component: () => import('@/views/auth/admin/alerts.vue'),
    meta: { title: 'Alerts', requiresAuth: true, requiresAdmin: true, requiresVerified: true }
  },
  {
    path: '/Activity-logs',
    name: 'Activity-logs',
    component: () => import('@/views/auth/admin/ActivityLogs.vue'),
    meta: { title: 'Activity logs', requiresAuth: true, requiresAdmin: true, requiresVerified: true }
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () => import('@/views/forbidden.vue'),
    meta: { title: 'Forbidden', }
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/404.vue'), meta: { title: '404', } },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


router.afterEach((to) => {
  const appName = 'VitaPulse';
  const routeTitle = to.meta.title;

  if (routeTitle) {
    document.title = `${routeTitle} - ${appName}`;
  } else {
    document.title = appName; // fallback
  }
});

router.beforeEach(async (to) => {
  const Auth = useUserStore()

  if (Auth.auth === null) {
    await Auth.verify();
  }

  const isAuthenticated = Auth.auth;
  const isVerified = Auth.auth?.isVerified;
  const isAdmin = Auth.auth?.role === 'admin';
  // Not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { path: '/login' }
  }

  if (to.meta.requiresVerified && !isVerified) {
    return { name: 'verification' }
  }

  // Prevent authenticated users from accessing guest-only routes
  if (to.meta.requiresGuest && isAuthenticated && isVerified ) {
    if (isAdmin) return { path: '/admin' }
    return { path: '/dashboard' }
  }

  // Prevent non-admins from accessing admin routes
  if (to.meta.requiresAdmin && !isAdmin && isVerified ) {
    return { path: '/forbidden' }
  }

  // Prevent admin users from accessing regular dashboard
  if (to.path === '/dashboard' && isAdmin && isVerified) {
    return { path: '/admin' }
  }
})


export default router
