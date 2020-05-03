<template>
    <div>
        <ValidationObserver ref="form">
            <form @submit.prevent="onSubmit">
                <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    class="form-group"
                    tag="div"
                >
                    <label for="title">Заголовок</label>
                    <input
                        v-model="title"
                        type="text"
                        class="form-control"
                        placeholder="Заголовок"
                        :class="{invalid: errors.length > 0}"
                        id="title"
                    />
                    <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>

                <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    class="form-group"
                    tag="div"
                >
                    <label for="text">Текст задачи</label>
                    <textarea
                        v-model="text"
                        type="text"
                        class="form-control"
                        placeholder="Текст задачи"
                        :class="{invalid: errors.length > 0}"
                        id="text"
                        rows="5"
                    />
                    <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>

                <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|numeric"
                    class="form-group"
                    tag="div"
                >
                    <label for="duration">Срок выполнения (часы)</label>
                    <input
                        v-model.number="duration"
                        type="number"
                        class="form-control"
                        placeholder="Срок выполнения (часы)"
                        :class="{invalid: errors.length > 0}"
                        id="duration"
                    />
                    <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>

                <button
                    type="submit"
                    class="btn btn-primary"
                >
                    Сохранить
                </button>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>

export default {
    props: {
        initialTitle: {
            type: String,
            default: ''
        },
        initialText: {
            type: String,
            default: ''
        },
        initialDuration: {
            type: Number
        }
    },
    data() {
        return {
            title: this.initialTitle,
            text: this.initialText,
            duration: this.initialDuration
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate().then((success) => {
                if (!success) {
                    return
                }
                const data = {
                    title: this.title,
                    text: this.text,
                    duration: this.duration
                }
                this.$emit('onSave', data);
                this.title = this.text = this.duration = '';

                this.$nextTick(() => {
                    if (this.$refs.form) {
                        this.$refs.form.reset();
                    }
                })
            })            
        }
    }
}
</script>

<style lang="scss">

</style>