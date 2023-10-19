<template>
    <a-page-header
        class="pageHeader"
        title="Clientes"
        sub-title="Gerencie os Clientes por aqui"
        @back="goBack"
    />

    <a-layout-content :style="{ margin: '10px 16px 25px' }">
        <div :style="{ padding: '20px', background: '#fff' }" class="content">
            <a-config-provider>
                <template #renderEmpty>
                    <div style="text-align: center; padding: 25px">
                        <smile-outlined style="font-size: 20px" />
                        <p>Nada encontrado</p>
                    </div>
                </template>
                <a-table
                    :columns="columns"
                    :data-source="data"
                    :pagination="false"
                    :loading="loading"
                    size="small"
                >
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="column.dataIndex === 'cnpj'">
                            {{ record.cnpj.value }}
                        </template>
                        <template v-else-if="column.dataIndex === 'active'">
                            <a-popconfirm
                                @confirm="toggleActive(record as ClientsData)"
                                title="Tem certeza que deseja desativar esse cliente?"
                            >
                                <a-switch
                                    :checked="record.active"
                                    :loading="record.isLoading"
                                    size="small"
                                    @change="
                                        handleSwitchChange(
                                            record as ClientsData
                                        )
                                    "
                                ></a-switch>
                            </a-popconfirm>
                        </template>
                        <template v-else-if="column.dataIndex === 'actions'">
                            <!-- <router-link :to="`/clients/${record.id}`">
                                <a-button size="small">Detalhes</a-button>
                            </router-link> -->
                            <router-link
                                :to="{
                                    name: 'clientDetails',
                                    params: { clientId: record.id },
                                    query: {
                                        pagination: JSON.stringify(pagination),
                                    },
                                }"
                            >
                                <a-button size="small">Detalhes</a-button>
                            </router-link>
                        </template>
                    </template>
                </a-table>
            </a-config-provider>
            <a-pagination
                v-model:current="pagination.page"
                v-model:pageSize="pagination.pageSize"
                :page-size-options="pageSizeOptions"
                show-size-changer
                :total="totalRecords"
                @showSizeChange="onShowSizeChange"
                style="text-align: right; margin: 25px 0 15px 0"
            >
                <template #buildOptionText="props">
                    <span>{{ props.value }}/pág</span>
                </template>
            </a-pagination>
        </div>
    </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import {
    AppleOutlined,
    AndroidOutlined,
    SmileOutlined,
} from '@ant-design/icons-vue'
import { useNavigation } from '../../composables/useNavigation'
import { Table } from 'ant-design-vue'

import { api } from '../../api/api'
import {
    PaginationRequest,
    PaginationResponse,
    ClientsData,
} from '../../types/types'
import { ErrorModel, notifyError } from '../../config/notification'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'Clients',
    components: {
        AppleOutlined,
        AndroidOutlined,
        SmileOutlined,
        'a-table': Table,
    },
    setup() {
        const { goBack } = useNavigation()
        const pageSizeOptions = ref<string[]>(['5', '10', '20', '40', '50'])
        const activeKey = ref('1')
        const totalRecords = ref(0)
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
                width: '3%',
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
                totalRecords.value = response.data.totalRecords
            } catch (error: any) {
                let erroModel: ErrorModel = error?.response?.data
                notifyError(erroModel)
            } finally {
                loading.value = false
            }
        }

        const route = useRoute()
        onMounted(() => {
            if (route.query.pagination) {
                pagination.value = JSON.parse(
                    route.query.pagination as string
                ) as PaginationRequest
            }
            fetchData()
        })

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
            totalRecords,
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
