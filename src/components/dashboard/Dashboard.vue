<template>
    <a-layout-content :style="{ margin: '10px 16px 25px' }">
        <div :style="{ padding: '20px', background: '#fff' }" class="content">
            <a-result
                title="Em breve..."
                sub-title="Desculpe, aqui ainda não está pronto, em breve estará finalizado!"
            >
                <template #icon>
                    <img src="/building.svg" style="width: 40%" />
                </template>
            </a-result>
        </div>
    </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useNavigation } from '../../composables/useNavigation'

export default defineComponent({
    name: 'Dashboard',
    setup(props) {
        const { goBack } = useNavigation()
        const store = useStore()
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
    height: 90vh !important;
    max-height: 90vh !important;
    margin-bottom: 0px !important;
    padding-bottom: 0px !important;
    display: flex;
    align-items: center;
    place-content: center;
}
</style>
