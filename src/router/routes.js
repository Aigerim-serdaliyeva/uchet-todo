import NotFound from '../components/NotFound.vue';

export const routes = [
    {
        path: '/',
        redirect: '/tasks'
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../components/Login.vue")
    },
    {
        path: "/registration",
        name: "registration",
        component: () => import("../components/Registration.vue")
    },
    {
        path: "/tasks",
        name: "tasks",
        meta: { isTaskPage: true },
        component: () => import("../components/AllTasks.vue")
    },
    {
        path: "/tasks/completed",
        name: "completed",
        meta: { isTaskPage: true },
        component: () => import("../components/CompletedTasks.vue")
    },
    {
        path: "/tasks/uncompleted",
        name: "uncompleted",
        meta: { isTaskPage: true },
        component: () => import("../components/UnCompletedTasks.vue")
    },
    {
        path: "/tasks/details/:id",
        name: "details",
        meta: { isTaskPage: true },
        component: () => import("../components/TaskDetails.vue")
    },
    {
        path: "/tasks/add",
        name: "add",
        component: () => import("../components/TaskAdd.vue")
    },
    {
        path: "/tasks/edit/:id",
        name: "edit",
        meta: { isTaskPage: true },
        component: () => import("../components/TaskEdit.vue")
    },
    {
        path: '*',
        name: 'no',
        component: NotFound
    }
]