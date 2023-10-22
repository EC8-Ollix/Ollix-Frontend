<template>
    <a-page-header
        class="pageHeader"
        title="Pedidos"
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
            <div class="filtros">
                <h3>Filtros</h3>
                <a-row>
                    <a-col class="filtros-input" :span="19">
                        <a-row>
                            <a-col :span="8" v-if="isAdmin">
                                <div>
                                    <div class="perso-label">Cliente</div>
                                    <a-input
                                        v-model:value="formState.clientSearch"
                                        placeholder="Cliente"
                                    >
                                    </a-input>
                                </div>
                            </a-col>
                            <a-col :span="8" v-if="!isAdmin">
                                <div>
                                    <div class="perso-label">Solicitante</div>
                                    <a-input
                                        v-model:value="
                                            formState.requesterSearch
                                        "
                                        placeholder="Cliente"
                                    >
                                    </a-input>
                                </div>
                            </a-col>
                            <a-col :span="9">
                                <div>
                                    <div class="perso-label">
                                        Data da Solicitação
                                    </div>

                                    <a-range-picker
                                        v-model:value="formState.requestedDate"
                                        :format="dateFormat"
                                        style="width: 100%"
                                        :locale="locale"
                                        :presets="rangePresets"
                                    />
                                </div>
                            </a-col>
                            <a-col :span="7">
                                <div>
                                    <div class="perso-label">Status</div>

                                    <a-select
                                        v-model:value="formState.orderStatus"
                                        placeholder="Status"
                                        style="width: 100%"
                                        allowClear
                                    >
                                        <a-select-option value="1"
                                            >Pendente</a-select-option
                                        >
                                        <a-select-option value="2"
                                            >Instalação
                                            Pendente</a-select-option
                                        >
                                        <a-select-option value="3"
                                            >Finalizado</a-select-option
                                        >
                                        <a-select-option value="4"
                                            >Negado</a-select-option
                                        >
                                        <a-select-option value="5"
                                            >Cancelado</a-select-option
                                        >
                                    </a-select>
                                </div>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col class="filtros-button" :span="5">
                        <a-row>
                            <a-col :span="15">
                                <div class="button-form-item">
                                    <a-button
                                        type="primary"
                                        style="width: 100%"
                                        @click="handlePesquisa"
                                    >
                                        Pesquisar
                                    </a-button>
                                </div>
                            </a-col>
                            <a-col :span="1"> </a-col>
                            <a-col :span="8">
                                <div class="button-form-item">
                                    <a-button
                                        style="width: 100%"
                                        @click="limpaPesquisa"
                                    >
                                        Limpar
                                    </a-button>
                                </div>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </div>

            <div class="table-results">
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
                                            getTagForOrderStatus(
                                                record.orderStatus
                                            ).icon
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
                            <template
                                v-else-if="column.dataIndex === 'actions'"
                            >
                                <div>
                                    <a-button
                                        :icon="h(FileTextOutlined)"
                                        href="https://www.google.com"
                                        size="small"
                                    >
                                        Visualizar
                                    </a-button>
                                </div>
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
        </div>
    </a-layout-content>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    PropType,
    onMounted,
    watch,
    toRefs,
    h,
    reactive,
    computed,
} from 'vue'
import { SmileOutlined, FileTextOutlined } from '@ant-design/icons-vue'
import { useNavigation } from '../../composables/useNavigation'
import { formatStringDateToBR } from '../../composables/dateHelper'
import { useStore } from 'vuex'

import { Table } from 'ant-design-vue'

import { api } from '../../api/api'
import {
    PaginationRequest,
    PaginationResponse,
    OrderData,
} from '../../types/types'
import { ErrorModel, notifyError } from '../../config/notification'

import { getTagForOrderStatus } from '../../types/order/orderStatus'

import dayjs, { Dayjs } from 'dayjs'

import 'dayjs/locale/pt-br'
import locale from 'ant-design-vue/es/date-picker/locale/pt_BR'

dayjs.locale('pt-br')

interface FiltroOrderState {
    clientSearch: string | undefined
    requesterSearch: string | undefined
    requestedDate: [Dayjs, Dayjs]
    orderStatus: string | undefined
}

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
        FileTextOutlined,
        SmileOutlined,
        'a-table': Table,
    },
    setup(props) {
        const { goBack } = useNavigation()

        const pageSizeOptions = ref<string[]>(['5', '10', '20', '40', '50'])
        const totalRecords = ref(0)

        const store = useStore()
        const isAdmin = computed(() => store.state.isAdmin)

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
                width: '20%',
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
                width: '15%',
            },
            {
                title: 'Qtd.',
                dataIndex: 'quantityRequested',
                width: '5%',
            },
            {
                title: 'Ações',
                dataIndex: 'actions',
                width: '5%',
            },
        ]

        const fetchData = async () => {
            loading.value = true

            const params: any = {
                requestedDateFrom: formState.requestedDate[0].toDate(),
                requestedDateTo: formState.requestedDate[1].toDate(),
                ...formState,
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
        const dateFormat = 'DD/MM/YYYY'
        const currentDate = dayjs()
        const thirtyDaysAgo = dayjs().subtract(30, 'day')

        const rangePresets = ref([
            { label: 'Últimos 7 dias', value: [dayjs().add(-7, 'd'), dayjs()] },
            {
                label: 'Últimos 14 dias',
                value: [dayjs().add(-14, 'd'), dayjs()],
            },
            {
                label: 'Últimos 30 dias',
                value: [dayjs().add(-30, 'd'), dayjs()],
            },
            {
                label: 'Últimos 90 dias',
                value: [dayjs().add(-90, 'd'), dayjs()],
            },
        ])

        const initialDates = ref<[Dayjs, Dayjs]>([
            dayjs(thirtyDaysAgo, dateFormat),
            dayjs(currentDate, dateFormat),
        ])

        const formState: FiltroOrderState = reactive({
            clientSearch: undefined,
            requesterSearch: undefined,
            requestedDate: initialDates.value,
            orderStatus: undefined,
        })

        const rangeConfig = {
            rules: [
                {
                    type: 'array' as const,
                },
            ],
        }

        const handlePesquisa = async () => {
            await fetchData()
        }
        const limpaPesquisa = async () => {
            formState.clientSearch = undefined
            formState.requesterSearch = undefined
            formState.orderStatus = undefined
            formState.requestedDate = initialDates.value
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
            FileTextOutlined,
            h,
            formState,
            handlePesquisa,
            rangeConfig,
            dateFormat,
            isAdmin,
            locale,
            limpaPesquisa,
            rangePresets,
        }
    },
})
</script>

<style scoped>
.content {
    border-radius: 12px;
}
</style>
