import { createRouter, createWebHistory } from 'vue-router'
import store from './store'

const routes = [
    {
        name: 'login',
        path: '/Ollix-Frontend/login',
        component: () => import('../components/authentication/Login.vue'),
        mode: 'hash',
    },
    {
        name: 'register',
        path: '/Ollix-Frontend/register',
        component: () => import('../components/authentication/Register.vue'),
        mode: 'hash',
    },
    {
        name: 'dashboard',
        path: '/Ollix-Frontend',
        component: () => import('../components/dashboard/Dashboard.vue'),
        mode: 'hash',
    },
    {
        name: 'helices',
        path: '/Ollix-Frontend/helices',
        component: () => import('../components/helices/Helices.vue'),
        mode: 'hash',
    },
    {
        name: 'logs',
        path: '/Ollix-Frontend/logs',
        component: () => import('../components/logs/Logs.vue'),
        mode: 'hash',
    },
    {
        name: 'users',
        path: '/Ollix-Frontend/users',
        component: () => import('../components/users/Users.vue'),
        mode: 'hash',
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters.isLoggedIn
    const user = store.getters.user

    if (
        to.name !== 'login' &&
        to.name !== 'register' &&
        (!isLoggedIn || !user)
    ) {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router
