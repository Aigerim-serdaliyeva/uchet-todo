<template>
    <div>
        <h1 class="page-title">Выполненные задачи</h1>
        <TaskList :tasks="completedTasks" />
    </div>
</template>

<script>
import TaskList from './TaskList.vue'
import { mapGetters } from 'vuex';

export default {
    components: { TaskList },
    computed: {
        ...mapGetters({
            completedTasks: 'tasks/completedTasks'
        })
    }
}
</script>