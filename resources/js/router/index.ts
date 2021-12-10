import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'event-calendar',
        component: () => import('../pages/EventCalendarPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;