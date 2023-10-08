import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    // {
    //     name: 'dashboard',
    //     path: '/Ollix-Frontend',
    //     component: () => import('../components/Dashboard/Dashboard.vue'),
    // },
    {
        name: 'helices',
        path: '/Ollix-Frontend/helices',
        component: () => import('../components/helices/Helices.vue'),
    },
    {
        name: 'logs',
        path: '/Ollix-Frontend/logs',
        component: () => import('../components/logs/Logs.vue'),
    },
    {
        name: 'users',
        path: '/Ollix-Frontend/users',
        component: () => import('../components/users/Users.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
