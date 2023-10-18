<template>
    <a-page-header
        class="pageHeader"
        title="Bem vindo ao Ollix!"
        @back="goBack"
    />

    <a-layout-content :style="{ margin: '10px 16px 25px' }">
        <div :style="{ padding: '20px', background: '#fff' }" class="content">
            <a-divider />
            <h4>Bem vindo Administrador {{ user.firstName }}</h4>
        </div>
    </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useNavigation } from '../../composables/useNavigation'

export default defineComponent({
    name: 'AdminDashboard',
    setup(props) {
        const store = useStore()
        const { goBack } = useNavigation()

        const user = computed(() => store.state.user)

        return {
            user,
            goBack,
        }
    },
})
</script>

<style scoped>
.content {
    border-radius: 12px;
}
</style>
