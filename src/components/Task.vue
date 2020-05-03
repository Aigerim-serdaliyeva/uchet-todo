<template>
    <div class="task">
        <h4 class="task__title" >{{ title }}</h4>
        <p class="task__text">{{ getSimbolText }}</p>
        <div>
            <router-link 
                :to="{name: 'details', params: {id: id}}" 
                tag="button" 
                class="btn btn-outline-primary" 
            >
                Просмотреть
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: ''
        },
        id: {
            type: Number
        }
    },
    computed: {
        getSimbolText() {
            const str = this.text.substring(0, 70);
            if(this.text.length >= 70) {
                return str + '...'
            } 
            return str
        }
    },
    methods: {
        ...mapActions({
            deleteTask: 'tasks/deleteTask'
        })
    }
}
</script>

<style lang="scss">
.task {
    padding: 15px;
    background: #fff;
    border: 1px solid rgba(0,0,0,.125);
    margin-bottom: 20px;

    &__title {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 20px;
    }
}
</style>