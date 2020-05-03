<template>
    <div>
        <h1 class="page-title">Все задачи</h1>
        <TaskList :tasks="tasks" />
    </div>
</template>

<script>
import TaskList from './TaskList.vue'
import { mapGetters } from 'vuex';

export default {
    components: { TaskList },
    computed: {
        ...mapGetters({
            tasks: 'tasks/tasks'
        })
    }
}
</script>