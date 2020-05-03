<template>
    <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8 col-sm-10 col-12">
            <ValidationObserver ref="form">
                <div class="form-title">Регистрация</div>
                <form @submit.prevent="onSubmit">
                    <ValidationProvider
                        v-slot="{ errors }"
                        rules="required|latin|min:3"
                        class="form-group"
                        tag="div"
                    >
                        <input
                            v-model.trim="login"
                            type="text"
                            class="form-control"
                            placeholder="Логин"
                            :class="{invalid: errors.length > 0}"
                        />
                        <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider
                        v-slot="{ errors }"
                        rules="required|min:5"
                        vid="password"
                        class="form-group"
                        tag="div"
                    >
                        <input
                            v-model="password"
                            type="password"
                            class="form-control"
                            placeholder="Пароль"
                            :class="{invalid: errors.length > 0}"
                        />
                        <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider
                        v-slot="{ errors }"
                        rules="required|confirmed:password"
                        class="form-group"
                        tag="div"
                    >
                        <input
                            v-model="confirm"
                            type="password"
                            class="form-control"
                            placeholder="Повторите пароль"
                            :class="{invalid: errors.length > 0}"
                        />
                        <span class="error-message">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <button
                        type="submit"
                        class="btn btn--center btn-primary"
                    >
                        Зарегистрироваться
                    </button>
                </form>
            </ValidationObserver>

            <div class="alert alert-success" role="alert" v-if="isSuccess">
                Пользователь добавлен. Перейдите по 
                <router-link to="/login" class="alert-link">ссылке</router-link> 
                чтобы авторизоваться.
            </div>

            <div class="alert alert-danger" role="alert" v-if="errorMessage">
                {{ errorMessage }}
            </div>
        </div>

        <div class="col-12">

        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            login: '',
            password: '',
            confirm: '',
            errorMessage: '',
            isSuccess: false
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate().then(success => {
                if(!success) {
                    return
                }

                const user = {
                    login: this.login,
                    password: this.password
                }

                this.registrateUser(user)
                    .then(() => {
                        this.isSuccess = true;

                        this.login = this.password = this.confirm = this.errorMessage = '';
                        
                        this.$nextTick(() => {
                            this.$refs.form.reset();
                        })
                    })
                    .catch((e) => this.errorMessage = e.message);
            })
        },
        ...mapActions({
            registrateUser: 'users/registrateUser'
        })
    }
}
</script>

<style lang="scss">

</style>