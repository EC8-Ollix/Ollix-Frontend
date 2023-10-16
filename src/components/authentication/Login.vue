<template>
    <div>
        <h1>Login</h1>

        <router-link to="/Ollix-Frontend/register"> Dashboard </router-link>
        <a-button @click="triggerError">Trigger Error</a-button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'Login',
    methods: {
        triggerError() {
            try {
                throw new Error('This is a test error')
            } catch (error) {
                this.$notifySuccess({
                    successTitle: 'Parabens',
                })
            }
        },
    },
})
</script>
