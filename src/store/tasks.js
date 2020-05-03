const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";
const EDIT_TASK = "EDIT_TASK";
const CHANGE_STATUS = "CHANGE_STATUS";

export const tasks = {
    namespaced: true,

    state: {
        tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
    },

    getters: {
        tasks: ({ tasks }, getters, rootState) => tasks.filter((t) => t.userId === rootState.authorizedUserId),
        completedTasks: ({ tasks }, getters, rootState) => tasks.filter((t) => t.status === 1 && t.userId === rootState.authorizedUserId),
        uncompletedTasks: ({ tasks }, getters, rootState) => tasks.filter((t) => t.status === 0 && t.userId === rootState.authorizedUserId),
        lastTaskId: ({ tasks }) => tasks.length === 0 ? 0 : tasks[tasks.length - 1].id
    },

    mutations: {
        [ADD_TASK](state, task) {
            task.status = 0
            state.tasks.push(task)
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },

        [DELETE_TASK](state, id) {
            const index = state.tasks.findIndex((task) => task.id === id);
            if(index >= 0) {
                state.tasks.splice(index, 1)
            }
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },

        [EDIT_TASK](state, data) {
            const selectedTask = state.tasks.find(task => task.id === data.id)
            if(selectedTask) {
                selectedTask.title = data.title;
                selectedTask.text = data.text;
                selectedTask.duration = data.duration;
            }
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },

        [CHANGE_STATUS](state, data) {
            const task = state.tasks.find((t) => t.id === data.id)
            if(task) {
                task.status = data.status
            }
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        }
    },

    actions: {
        addTask({ commit, getters, rootState }, task) {
            task.userId = rootState.authorizedUserId
            task.id = getters.lastTaskId + 1
            commit(ADD_TASK, task)
        },

        deleteTask({ commit }, id) {
            commit(DELETE_TASK, id)
        },

        async getTaskById({ getters: { tasks } }, id) {
            return tasks.find((t) => t.id === id);
        },

        editTask({ commit }, data) {
            commit(EDIT_TASK, data)
        },

        changeStatus({ commit }, data) {
            commit(CHANGE_STATUS, data)
        }
    }
}