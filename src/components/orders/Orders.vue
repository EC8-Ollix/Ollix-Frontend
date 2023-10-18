<template>
    <a-page-header
        class="pageHeader"
        title="Pedidos"
        sub-title="Analise os pedidos"
        @back="goBack"
    />

    <a-layout-content :style="{ margin: '10px 16px 25px' }">
        <div :style="{ padding: '20px', background: '#fff' }" class="content">
            Pedidos aqui
        </div>
    </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue'
import { useNavigation } from '../../composables/useNavigation'

export default defineComponent({
    name: 'Orders',
    components: {
        AppleOutlined,
        AndroidOutlined,
    },
    setup() {
        const { goBack } = useNavigation()
        const activeKey = ref('1')

        return {
            goBack,
            activeKey,
        }
    },
})
</script>

<style scoped>
.content {
    border-radius: 12px;
}
</style>
