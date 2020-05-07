<template>
    <div class="tasks">
        <div class="row" v-if="tasks.length > 0">
            <div class="col-xl-4 col-md-6"
                v-for="task in tasks"
                :key="task.id"  
            >
                <Task 
                    :id="task.id"
                    :title="task.title"
                    :text="task.text"
                />
            </div>
        </div>
        <div class="empty-list" v-else>Задачи нет</div>
    </div>
</template>

<script>

import Task from './Task.vue'

export default {
    components: { Task },
    props: {
        tasks: {
            type: Array,
            default: () => []
        }
    }
}
</script>