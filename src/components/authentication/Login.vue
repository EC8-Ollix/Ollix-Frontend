<template>
    <div>
        <h1>Login</h1>

        <router-link to="/Ollix-Frontend/register"> Dashboard </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'Login',
})
</script>
