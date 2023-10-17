import { createRouter, createWebHistory } from 'vue-router'
import store from './store'

const routes = [
    {
        name: 'authentication',
        path: '/Ollix-Frontend/auth',
        component: () =>
            import('../components/authentication/Authentication.vue'),
        mode: 'hash',
    },
    {
        name: 'dashboard',
        path: '/Ollix-Frontend/',
        component: () => import('../components/dashboard/Dashboard.vue'),
        mode: 'hash',
        meta: { requiresAuth: true },
    },
    {
        name: 'helices',
        path: '/Ollix-Frontend/helices',
        component: () => import('../components/helices/Helices.vue'),
        mode: 'hash',
        meta: { requiresAuth: true },
    },
    {
        name: 'logs',
        path: '/Ollix-Frontend/logs',
        component: () => import('../components/logs/Logs.vue'),
        mode: 'hash',
        meta: { requiresAuth: true },
    },
    {
        name: 'users',
        path: '/Ollix-Frontend/users',
        component: () => import('../components/users/Users.vue'),
        mode: 'hash',
        meta: { requiresAuth: true },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const isLoggedIn =
        store.getters.isLoggedIn || localStorage.getItem('authToken')

    if (to.matched.some((route) => route.meta.requiresAuth) && !isLoggedIn) {
        next({ name: 'authentication' })
    } else {
        next()
    }
})

export default router
