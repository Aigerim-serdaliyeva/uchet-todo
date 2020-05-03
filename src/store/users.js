import { AUTHORIZE_USER } from './index'
const REGISTRATE = "REGISTRATE";

export const users = {
    namespaced: true,

    state: {
        users: JSON.parse(localStorage.getItem('users') || '[]')
    },

    getters: {
        users: ({ users }) => {
            console.log('users: ', users)
            return users
        },
        lastUserId({ users }) {
            return users.length === 0 ? 0 : users[users.length - 1].id
        },
        authorizedUser: ({ authorizedUserId }) => authorizedUserId
    },

    mutations: {
        [REGISTRATE](state, user) {
            state.users.push(user);
            localStorage.setItem('users', JSON.stringify(state.users))
        }
    },

    actions: {
        async registrateUser({ commit, getters }, user) {
            const { users } = getters;
            const existingUser = users.find((u) => u.login === user.login);
            if (existingUser) {
                throw new Error('Такой логин уже существует')
            }
            user.id = getters.lastUserId + 1
            commit(REGISTRATE, user)
            return user;
        },

        async authorizeUser({ commit, getters }, data) {
            const { users } = getters;
            const user = users.find((u) => (u.login === data.login && u.password === data.password ));
            if(!user) {
                throw new Error('Логин или пароль не правильно')
            }
            return commit(AUTHORIZE_USER, user.id, { root: true })
        },

        async logoutUser({ commit }) {
            return commit(AUTHORIZE_USER, 0, { root: true })
        }
    }
}