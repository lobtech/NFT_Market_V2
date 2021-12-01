import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('../views/home/index.vue'),
        meta: {
            keepAlive: true,
            showFooter: true,
            transition: 'slide-right',
        },
    },
    {
        name: 'other',
        path: '/other',
        component: () => import('../views/other/index.vue'),
        meta: {
            keepAlive: true,
            showFooter: true,
            transition: 'slide-right',
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router
