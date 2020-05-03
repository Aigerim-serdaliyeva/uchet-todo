<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light" :class="{ 'fixed-top': isFixed }">
            <div class="container">
                <a class="navbar-brand" href="/">ToDo</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav" v-if="isAuthorized">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" :class="{ active: isTaskPage }" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Задачи
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link to="/tasks" exact class="dropdown-item">Все задачи</router-link>
                            <router-link to="/tasks/completed" exact class="dropdown-item">Выполненные задачи</router-link>
                            <router-link to="/tasks/uncompleted" exact class="dropdown-item">Невыполненные задачи</router-link>
                            </div>
                        </li>
                        <router-link
                            to="/tasks/add"
                            v-slot="{ href, route, navigate, isExactActive }"
                        >
                            <li
                                :class="[isExactActive && 'active']"
                            >
                                <a class="nav-link" :href="href" @click="navigate">Добавить задачу</a>
                            </li>
                        </router-link>
                    </ul>
                    <ul class="navbar-nav ml-auto" v-else>
                        <router-link
                            to="/login"
                            v-slot="{ href, route, navigate, isExactActive }"
                        >
                            <li
                                :class="[isExactActive && 'active']"
                            >
                                <a class="nav-link" :href="href" @click="navigate">Логин</a>
                            </li>
                        </router-link>
                        <router-link
                            to="/registration"
                            v-slot="{ href, route, navigate, isExactActive }"
                        >
                            <li
                                :class="[isExactActive && 'active']"
                            >
                                <a class="nav-link" :href="href" @click="navigate">Регистрация</a>
                            </li>
                        </router-link>
                        
                    </ul>
                    <ul class="navbar-nav ml-auto" v-if="isAuthorized">
                        <li >
                            <a @click.prevent="logout" href="#" class="nav-link">Выйти</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div style="height: 56px" :class="{ 'd-none': !isFixed }"></div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            isFixed: false
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll)
    },
    destroyed() {
        window.removeEventListener('scroll', this.onScroll)
    },
    computed: {
        ...mapGetters({
            isAuthorized: 'isAuthorized'
        }),
        isTaskPage() {
            return this.$route.meta.isTaskPage
        },
        top() {
            return this.$el && this.$el.offsetTop;
        }
    },
    methods: {
        ...mapActions({
            logoutUser: 'users/logoutUser'
        }),
        logout() {
            this.logoutUser();
            this.$router.push('/login')
        },
        onScroll() {
            this.isFixed = window.pageYOffset > this.top;
        }
    }
}
</script>

<style lang="scss">

</style>