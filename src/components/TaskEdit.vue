<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/tasks">Задачи</router-link></li>
            <li class="breadcrumb-item">
                <router-link :to="`/tasks/details/${id}`">{{ selectedTask && selectedTask.title }}</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Редактирование задачи</li>
        </ol>
        <h1 class="page-title">Редактирование задачи</h1>
         <div class="row justify-content-center">
            <div class="col-xl-6 col-lg-8 col-md-10">
                 <TaskForm 
                    v-if="selectedTask" 
                    :initialTitle="selectedTask.title" 
                    :initialText="selectedTask.text" 
                    :initialDuration="selectedTask.duration" 
                    @onSave="onEditTask"
                />
            </div>
         </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import TaskForm from './TaskForm.vue'

export default {
    components: { TaskForm },
    data() {
        return {
            selectedTask: null
        }
    },
    mounted() {
        this.getTaskById(this.id)
            .then((d) => this.selectedTask = d)
    },
    computed: {
        id() {
            return Number(this.$route.params.id)
        }
    },
    methods: {
        ...mapActions({
            editTask: 'tasks/editTask',
            getTaskById: 'tasks/getTaskById'
        }),
        onEditTask(task) {
            task.id = this.id
            this.editTask(task)
            this.$router.push('/tasks')
        }
    }
}
</script>