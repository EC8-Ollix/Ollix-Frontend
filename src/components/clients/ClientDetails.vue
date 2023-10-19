<template>
    <a-page-header class="pageHeader" title="Cliente" @back="goBack">
        <div v-if="clientData">
            Razão Social: {{ clientData.companyName }}
            <!-- ... other client details ... -->
        </div>
    </a-page-header>

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
                    <Helice
                        :clientId="clientData?.id"
                        :viaClientScreen="true"
                    />
                </a-tab-pane>
                <a-tab-pane key="2">
                    <template #tab>
                        <span>
                            <android-outlined />
                            Pedidos
                        </span>
                    </template>
                    <Orders
                        :clientId="clientData?.id"
                        :viaClientScreen="true"
                    />
                </a-tab-pane>
                <a-tab-pane key="3">
                    <template #tab>
                        <span>
                            <apple-outlined />
                            Usuários
                        </span>
                    </template>
                    <Users :clientId="clientData?.id" :viaClientScreen="true" />
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
import { defineComponent, ref, PropType, onMounted } from 'vue'
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue'
import { useNavigation } from '../../composables/useNavigation'
import { useRoute } from 'vue-router'
import { api } from '../../api/api'
import { ClientsData } from '../../types/types'
import { ErrorModel, notifyError } from '../../config/notification'
import Helice from '../helices/Helices.vue'
import Orders from '../orders/Orders.vue'
import Users from '../users/Users.vue'

export default defineComponent({
    name: 'ClientDetails',
    components: {
        AppleOutlined,
        AndroidOutlined,
        Helice,
        Orders,
        Users,
    },
    props: {
        clientId: {
            type: String as PropType<string>,
            required: true,
        },
    },
    setup() {
        const { goBack } = useNavigation()
        const activeKey = ref('1')
        const route = useRoute()
        const clientData = ref<ClientsData>()

        onMounted(async () => {
            try {
                const response = await api.get<ClientsData>(
                    `/clients/${route.params.clientId}`
                )
                clientData.value = response.data
            } catch (error: any) {
                let erroModel: ErrorModel = error?.response?.data
                notifyError(erroModel)
            }
        })

        return {
            goBack,
            activeKey,
            clientData,
        }
    },
})
</script>

<style scoped>
.content {
    border-radius: 12px;
}
</style>
