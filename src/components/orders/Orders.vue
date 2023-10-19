<template>
    <a-page-header
        class="pageHeader"
        title="Pedidos"
        sub-title="Analise os pedidos"
        @back="goBack"
        v-if="!viaClientScreen"
    />

    <a-layout-content
        :style="!viaClientScreen ? { margin: '10px 16px 25px' } : {}"
    >
        <div
            :style="
                !viaClientScreen ? { padding: '20px', background: '#fff' } : {}
            "
            :class="{ content: !viaClientScreen }"
        >
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
                        <template v-if="column.dataIndex === 'requestDate'">
                            {{
                                formatStringDateToBR(
                                    record.requestDate as string
                                )
                            }}
                        </template>
                        <template v-else-if="column.dataIndex === 'client'">
                            {{ record.clientApp.bussinessName }}
                        </template>
                        <template
                            v-else-if="column.dataIndex === 'orderStatus'"
                        >
                            <a-tag
                                :color="
                                    getTagForOrderStatus(record.orderStatus)
                                        .color
                                "
                            >
                                <template
                                    v-if="
                                        getTagForOrderStatus(record.orderStatus)
                                            .icon
                                    "
                                    #icon
                                >
                                    <component
                                        :is="
                                            getTagForOrderStatus(
                                                record.orderStatus
                                            ).icon
                                        "
                                    />
                                </template>
                                {{
                                    getTagForOrderStatus(record.orderStatus)
                                        .text
                                }}
                            </a-tag>
                        </template>
                        <template v-else-if="column.dataIndex === 'actions'">
                            <a-button>Ver Pedido</a-button>
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
import { defineComponent, ref, PropType, onMounted, watch, toRefs } from 'vue'
import {
    AppleOutlined,
    AndroidOutlined,
    SmileOutlined,
} from '@ant-design/icons-vue'
import { useNavigation } from '../../composables/useNavigation'
import { formatStringDateToBR } from '../../composables/dateHelper'

import { Table } from 'ant-design-vue'

import { api } from '../../api/api'
import {
    PaginationRequest,
    PaginationResponse,
    OrderData,
} from '../../types/types'
import { ErrorModel, notifyError } from '../../config/notification'

import { getTagForOrderStatus } from '../../types/order/orderStatus'

export default defineComponent({
    name: 'Orders',
    props: {
        clientId: {
            type: String as PropType<string>,
        },
        viaClientScreen: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
    },
    components: {
        AppleOutlined,
        AndroidOutlined,
        SmileOutlined,
        'a-table': Table,
    },
    setup(props) {
        const { goBack } = useNavigation()

        const pageSizeOptions = ref<string[]>(['5', '10', '20', '40', '50'])
        const totalRecords = ref(0)

        const data = ref<OrderData[]>([])
        const loading = ref(false)
        const { clientId, viaClientScreen } = toRefs(props)

        const pagination = ref<PaginationRequest>({
            page: 1,
            pageSize: 10,
        })

        const columns = [
            {
                title: 'Status',
                dataIndex: 'orderStatus',
                width: '10%',
            },
            {
                title: 'Cliente',
                dataIndex: 'client',
                width: '15%',
            },
            {
                title: 'Nome',
                dataIndex: 'requesterName',
                width: '25%',
            },
            {
                title: 'Email',
                dataIndex: 'requesterEmail',
                width: '20%',
            },
            {
                title: 'Data da Solicitação',
                dataIndex: 'requestDate',
                width: '10%',
            },
            {
                title: 'Quantidade',
                dataIndex: 'quantityRequested',
                width: '10%',
            },
            {
                title: 'Ações',
                dataIndex: 'actions',
                width: '10%',
            },
        ]

        const fetchData = async () => {
            loading.value = true

            const params: any = {
                // orderStatus: 1,
                ...pagination.value,
            }

            if (clientId.value) {
                params.clientId = clientId.value
            }

            try {
                const response = await api.get<PaginationResponse<OrderData>>(
                    '/orders',
                    {
                        params: params,
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

        onMounted(fetchData)

        watch(pagination, fetchData, { deep: true })

        const onShowSizeChange = (current: number, pageSize: number) => {
            pagination.value.page = current
            pagination.value.pageSize = pageSize

            if (pageSize !== pagination?.value.pageSize) {
                data.value = []
            }
        }

        return {
            goBack,
            data,
            loading,
            pagination,
            columns,
            onShowSizeChange,
            pageSizeOptions,
            totalRecords,
            formatStringDateToBR,
            getTagForOrderStatus,
        }
    },
})
</script>

<style scoped>
.content {
    border-radius: 12px;
}
</style>
../../types/orders/orderStatus
