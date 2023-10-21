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
                        <span><ControlOutlined />Hélices </span>
                    </template>
                    <Helice
                        :clientId="clientData?.id"
                        :viaClientScreen="true"
                    />
                </a-tab-pane>
                <a-tab-pane key="2">
                    <template #tab>
                        <span><ProfileOutlined />Pedidos </span>
                    </template>
                    <Orders
                        :clientId="clientData?.id"
                        :viaClientScreen="true"
                    />
                </a-tab-pane>
                <a-tab-pane key="3">
                    <template #tab>
                        <span><TeamOutlined />Usuários </span>
                    </template>
                    <Users :clientId="clientData?.id" :viaClientScreen="true" />
                </a-tab-pane>
                <a-tab-pane key="4">
                    <template #tab>
                        <span><AuditOutlined />Logs </span>
                    </template>
                    <Logs :clientId="clientData?.id" :viaClientScreen="true" />
                </a-tab-pane>
            </a-tabs>
        </div>
    </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted } from 'vue'
import {
    ProfileOutlined,
    ControlOutlined,
    AuditOutlined,
    TeamOutlined,
} from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../../api/api'
import { ClientsData } from '../../types/types'
import { ErrorModel, notifyError } from '../../config/notification'
import Helice from '../helices/Helices.vue'
import Orders from '../orders/Orders.vue'
import Users from '../users/Users.vue'
import Logs from '../logs/Logs.vue'

export default defineComponent({
    name: 'ClientDetails',
    components: {
        ProfileOutlined,
        ControlOutlined,
        AuditOutlined,
        TeamOutlined,
        Helice,
        Orders,
        Users,
        Logs,
    },
    props: {
        clientId: {
            type: String as PropType<string>,
            required: true,
        },
    },
    setup() {
        const activeKey = ref('1')
        const route = useRoute()
        const clientData = ref<ClientsData>()

        const router = useRouter()
        function goBack() {
            if (route.query.pagination) {
                router.push({
                    path: '/clients',
                    query: { pagination: route.query.pagination },
                })
            } else {
                router.push({ path: '/clients' })
            }
        }

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
