<template>
    <a-page-header
        class="pageHeader"
        title="Clients"
        sub-title="Manage your clients here"
        @back="goBack"
    />

    <a-layout-content :style="{ margin: '10px 16px 25px' }">
        <div :style="{ padding: '20px', background: '#fff' }" class="content">
            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1">
                    <template #tab>
                        <span>
                            <apple-outlined />
                            Hélices
                        </span>
                    </template>
                    Hélices aqui
                </a-tab-pane>
                <a-tab-pane key="2">
                    <template #tab>
                        <span>
                            <android-outlined />
                            Pedidos
                        </span>
                    </template>
                    Pedidos aqui
                </a-tab-pane>
                <a-tab-pane key="3">
                    <template #tab>
                        <span>
                            <apple-outlined />
                            Usuários
                        </span>
                    </template>
                    Usuários aqui
                </a-tab-pane>
                <a-tab-pane key="4">
                    <template #tab>
                        <span>
                            <android-outlined />
                            Logs
                        </span>
                    </template>
                    Logs aqui
                </a-tab-pane>
            </a-tabs>
        </div>
    </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue'
import { useNavigation } from '../../composables/useNavigation'

export default defineComponent({
    name: 'ClientDetails',
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
