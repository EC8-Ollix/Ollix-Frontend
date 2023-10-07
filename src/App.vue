<script lang="ts">
import Header from './components/template/Header.vue'
import Sidebar from './components/template/Sidebar.vue'
import Content from './components/template/Content.vue'

import { defineComponent } from 'vue'

export default defineComponent({
    name: 'App',
    components: { Header, Sidebar, Content },
})
</script>

<template>
    <a-config-provider
        :theme="{
            token: {
                colorPrimary: '#153146',
            },
        }"
    >
        <a-layout style="height: 100vh">
            <Header title="Cliente 1" />

            <a-layout>
                <Sidebar />
                <a-layout>
                    <Content />
                </a-layout>
            </a-layout>
        </a-layout>
    </a-config-provider>
</template>

<style scoped></style>
