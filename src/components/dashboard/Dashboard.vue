<template>
    <a-page-header
        class="pageHeader"
        title="Bem vindo ao Ollix!"
        sub-title="Lorem ipsum dolor sit amet"
        @back="() => $router.go(-1)"
    />

    <a-layout-content :style="{ margin: '10px 16px 25px' }">
        <div :style="{ padding: '20px', background: '#fff' }" class="content">
            <a-divider />
            <h4>Bem vindo {{ user.firstName }}</h4>
        </div>
    </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'Dashboard',
    setup(props) {
        const store = useStore()

        const user = computed(() => store.state.user)

        return {
            user,
        }
    },
})
</script>

<style scoped>
.content {
    border-radius: 12px;
}
</style>
