<template>
    <a-page-header
        class="pageHeader"
        title="Clientes"
        sub-title="Gerencie os UClientes suários por aqui"
        @back="goBack"
    />

    <a-layout-content :style="{ margin: '10px 16px 25px' }">
        <div :style="{ padding: '20px', background: '#fff' }" class="content">
            <a-table
                :columns="columns"
                :data-source="data"
                :pagination="false"
                :loading="loading"
            >
                <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex === 'cnpj'">
                        {{ record.cnpj.value }}
                    </template>
                    <template v-else-if="column.dataIndex === 'active'">
                        <a-popconfirm
                            @confirm="toggleActive(record)"
                            title="Tem certeza que deseja desativar esse cliente?"
                        >
                            <a-switch
                                :checked="record.active"
                                :loading="record.isLoading"
                                @change="handleSwitchChange(record)"
                            ></a-switch>
                        </a-popconfirm>
                    </template>
                    <template v-else-if="column.dataIndex === 'actions'">
                        <a-button>Detalhes</a-button>
                    </template>
                </template>
                <template #footer>
                    <a-pagination
                        v-model:current="pagination.page"
                        v-model:pageSize="pagination.pageSize"
                        :page-size-options="pageSizeOptions"
                        show-size-changer
                        :total="pagination.total"
                        @showSizeChange="onShowSizeChange"
                        style="text-align: right"
                    >
                        <template #buildOptionText="props">
                            <span>{{ props.value }}/pág</span>
                        </template>
                    </a-pagination></template
                >
            </a-table>
        </div>
    </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue'
import { useNavigation } from '../../composables/useNavigation'
import { Table } from 'ant-design-vue'
import type { TablePaginationConfig } from 'ant-design-vue'

import { api } from '../../api/api.ts'
import { PaginationRequest, PaginationResponse, ClientsData } from '../../types'
import { ErrorModel, notifyError } from '../../config/notification.ts'

export default defineComponent({
    name: 'Clients',
    components: {
        AppleOutlined,
        AndroidOutlined,
        'a-table': Table,
    },
    setup() {
        const { goBack } = useNavigation()
        const pageSizeOptions = ref<string[]>(['5', '10', '20', '40', '50'])
        const activeKey = ref('1')

        const data = ref<ClientsData[]>([])
        const loading = ref(false)
        const pagination = ref<PaginationRequest>({
            page: 1,
            pageSize: 10,
        })

        const columns = [
            {
                title: '',
                dataIndex: 'active',
                width: '5%',
            },
            {
                title: 'Razão Social',
                dataIndex: 'companyName',
                width: '25%',
            },
            {
                title: 'Nome Fantasia',
                dataIndex: 'bussinessName',
                width: '25%',
            },
            {
                title: 'CNPJ',
                dataIndex: 'cnpj',
                width: '25%',
            },
            {
                title: 'Ações',
                dataIndex: 'actions',
                width: '20%',
            },
        ]

        const fetchData = async () => {
            loading.value = true
            try {
                const response = await api.get<PaginationResponse<ClientsData>>(
                    '/clients',
                    {
                        params: pagination.value,
                    }
                )

                data.value = response.data.data
                pagination.value.page = response.data.page
                pagination.value.pageSize = response.data.pageSize
                pagination.value.total = response.data.totalRecords
            } catch (error: any) {
                let erroModel: ErrorModel = error?.response?.data
                notifyError(erroModel)
            } finally {
                loading.value = false
            }
        }

        onMounted(fetchData)

        watch(pagination, fetchData, { deep: true })

        const onShowSizeChange = (current: number, pageSize: number) => {
            pagination.value.page = current
            pagination.value.pageSize = pageSize

            if (pageSize !== pagination?.value.pageSize) {
                data.value = []
            }
        }

        const toggleActive = async (record: ClientsData) => {
            record.isLoading = true
            try {
                await api.patch(`/clients/${record.id}/toggle`)
                record.active = !record.active
            } catch (error: any) {
                let erroModel: ErrorModel = error?.response?.data
                notifyError(erroModel)
            } finally {
                record.isLoading = false
            }
        }

        const handleSwitchChange = (record: ClientsData) => {}
        return {
            goBack,
            activeKey,
            data,
            loading,
            pagination,
            columns,
            toggleActive,
            onShowSizeChange,
            pageSizeOptions,
            handleSwitchChange,
        }
    },
})
</script>

<style scoped>
.content {
    border-radius: 12px;
    /* height: calc(100vh - 10rem); */
}
</style>
