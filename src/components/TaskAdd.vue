<template>
    <div>
        <h1 class="page-title">Добавление задачи</h1>
        <div class="row justify-content-center">
            <div class="col-xl-6 col-lg-8 col-md-10">
                <TaskForm @onSave="onAddTask" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import TaskForm from './TaskForm.vue';
export default {
    components: { TaskForm },
    methods: {
        ...mapActions({
            addTask: 'tasks/addTask'
        }),
        onAddTask(task) {
            this.addTask(task)
            this.$router.push('/tasks')
        }
    }
}
</script>