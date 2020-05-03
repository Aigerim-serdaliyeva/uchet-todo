import VueRouter from "vue-router";
import { store } from '../store';
import { routes } from './routes.js';

export const router = new VueRouter({
    linkActiveClass: "active",
    mode: "history",
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes
})

/* eslint-disable no-unused-vars */
router.beforeEach((to, from, next) => {
    const { isAuthorized } = store.getters
    if(
        to.name === 'login' ||
        to.name === 'registration'
    ) {
        return isAuthorized ? next('/') : next();
    }
    return isAuthorized ? next() : next('/login');
})
