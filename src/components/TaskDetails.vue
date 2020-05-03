<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/tasks">Задачи</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">{{ selectedTask && selectedTask.title }}</li>
        </ol>
        <h1 class="page-title">Просмотр задачи</h1>
        <div v-if="selectedTask">
            <table class="table">
                <tbody>
                    <tr>
                        <th class="th" scope="row">Заголовок</th>
                        <td>{{ selectedTask.title }}</td>
                    </tr>
                    <tr>
                        <th class="th" scope="row">Текст задачи</th>
                        <td>{{ selectedTask.text }}</td>
                    </tr>
                    <tr>
                        <th class="th" scope="row">Срок выполнения</th>
                        <td>{{ selectedTask.duration }} ч.</td>
                    </tr>
                    <tr>
                        <th class="th" scope="row">Статус</th>
                        <td>
                            <select class="custom-select" id="status" v-model="taskStatus" @change="onChangeStatus">
                                <option value="0">Не выполнено</option>
                                <option value="1">Выполнено</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="buttons">
                <router-link 
                    :to="{name: 'edit', params: {id: selectedTask.id}}" 
                    tag="button" 
                    class="btn btn-outline-primary" 
                >
                    Редактировать
                </router-link>
                <button type="button" class="btn btn-outline-danger" @click="onDeleteTask">Удалить</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            selectedTask: null,
            taskStatus: 0
        }
    },
    mounted() {
        this.getTaskById(this.id)
            .then((t) => {
                this.selectedTask = t
                this.taskStatus = t.status
            })
    },
    computed: {
        id() {
            return Number(this.$route.params.id)
        }
    },
    methods: {
        ...mapActions({
            deleteTask: 'tasks/deleteTask',
            getTaskById: 'tasks/getTaskById',
            changeStatus: 'tasks/changeStatus'
        }),
        onChangeStatus() {
            this.changeStatus({id: this.id, status: Number(this.taskStatus)})
            alert('Статус изменен')
        },
        onDeleteTask() {
            this.deleteTask(this.selectedTask.id)
            this.$router.push('/tasks')
        }
    }
}
</script>

<style lang="scss">
.th {
    width: 250px;
}

.buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 250px;
    width: 100%;
    margin: 50px 0 0 auto;
}

.item-value {
    margin-bottom: 20px;
}

@media (max-width: 767px) {
    .th {
        width: 120px;
    }
}
</style>