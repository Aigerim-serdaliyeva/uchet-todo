import Vue from 'vue';
import Vuex from 'vuex';
import { tasks } from './tasks';
import { users } from './users';

Vue.use(Vuex);

export const AUTHORIZE_USER = "AUTHORIZE_USER";

export const store = new Vuex.Store({
    modules: {
        tasks,
        users
    },
    state: {
        authorizedUserId: JSON.parse(sessionStorage.getItem('authorizedUserId') || '0'),
    },
    getters: {
        isAuthorized: ({ authorizedUserId }) => Boolean(authorizedUserId)
    },
    mutations: {
        [AUTHORIZE_USER](state, id) {
            state.authorizedUserId = id
            sessionStorage.setItem('authorizedUserId', id)
        }
    }
})