import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            keepAlive: true,
        },
    },
    {
        name: 'test',
        path: '/test',
        component: () => import('@/views/test/index.vue'),
        meta: {
            keepAlive: true,
        },
    },
    {
        name: 'test2',
        path: '/test2',
        component: () => import('@/views/test2/index.vue'),
        meta: {
            keepAlive: true,
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router
