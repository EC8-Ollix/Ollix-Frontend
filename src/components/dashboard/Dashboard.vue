<template>
    <a-page-header
        class="pageHeader"
        title="Bem vindo ao Ollix!"
        sub-title="Lorem ipsum dolor sit amet"
        @back="() => null"
    />

    <a-layout-content :style="{ margin: '10px 16px 25px' }">
        <div :style="{ padding: '20px', background: '#fff' }" class="content">
            <a-divider />
        </div>
    </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'Dashboard',
})
</script>

<style scoped>
.content {
    border-radius: 12px;
}
</style>
