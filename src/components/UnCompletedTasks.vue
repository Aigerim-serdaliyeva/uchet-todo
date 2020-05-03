<template>
    <div>
        <h1 class="page-title">Невыполненные задачи</h1>
        <TaskList :tasks="uncompletedTasks" />
    </div>
</template>

<script>
import TaskList from './TaskList.vue'
import { mapGetters } from 'vuex';

export default {
    components: { TaskList },
    computed: {
        ...mapGetters({
            uncompletedTasks: 'tasks/uncompletedTasks'
        })
    }
}
</script>