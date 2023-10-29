<template>
    <a-page-header
        class="pageHeader"
        title="Logs"
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
                    <a-col class="filtros-input" :span="20">
                        <a-row>
                            <a-col :span="6">
                                <div>
                                    <div class="perso-label">Usuário</div>
                                    <a-input
                                        v-model:value="formState.userName"
                                        placeholder="Usuário"
                                    >
                                    </a-input>
                                </div>
                            </a-col>
                            <a-col :span="4">
                                <div>
                                    <div class="perso-label">Entidade</div>

                                    <a-config-provider>
                                        <template #renderEmpty>
                                            <div
                                                style="
                                                    text-align: center;
                                                    padding: 10px;
                                                "
                                            >
                                                <smile-outlined
                                                    style="font-size: 15px"
                                                />
                                                <p>Nada encontrado</p>
                                            </div>
                                        </template>
                                        <a-select
                                            v-model:value="formState.entity"
                                            show-search
                                            placeholder="Entidade"
                                            style="width: 100%"
                                            :options="entityOptions"
                                            :filter-option="filterOption"
                                            @change="handleEntityChange"
                                            :allowClear="true"
                                        ></a-select>
                                    </a-config-provider>
                                </div>
                            </a-col>
                            <a-col :span="4">
                                <div class="perso-label">Operação</div>
                                <a-config-provider>
                                    <template #renderEmpty>
                                        <div
                                            style="
                                                text-align: center;
                                                padding: 10px;
                                            "
                                        >
                                            <smile-outlined
                                                style="font-size: 15px"
                                            />
                                            <p>Nada encontrado</p>
                                        </div>
                                    </template>
                                    <a-select
                                        v-model:value="formState.operation"
                                        show-search
                                        placeholder="Operação"
                                        style="width: 100%"
                                        :options="operationOptions"
                                        :filter-option="filterOption"
                                        :allowClear="true"
                                    ></a-select>
                                </a-config-provider>
                            </a-col>
                            <a-col :span="10">
                                <div>
                                    <div class="perso-label">
                                        Data da Solicitação
                                    </div>

                                    <a-range-picker
                                        v-model:value="formState.date"
                                        :format="dateFormat"
                                        style="width: 100%"
                                        :locale="locale"
                                        :presets="rangePresets"
                                        :allowClear="false"
                                    />
                                </div>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col class="filtros-button" :span="4">
                        <a-row style="justify-content: space-between">
                            <a-col :span="15">
                                <div class="button-form-item">
                                    <a-button
                                        type="primary"
                                        style="width: 100%"
                                        @click="handlePesquisa"
                                        ><SearchOutlined />
                                        Pesquisar
                                    </a-button>
                                </div>
                            </a-col>
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
                            <template v-if="column.dataIndex === 'postalCode'">
                                {{
                                    formatStringDateToBR(
                                        record.requestDate as string
                                    )
                                }}
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
    <a-layout-footer v-if="!viaClientScreen" class="footer"></a-layout-footer>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    watch,
    PropType,
    toRefs,
    computed,
    reactive,
} from 'vue'
import { useNavigation } from '../../composables/useNavigation'
import { useStore } from 'vuex'
import { SmileOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { api } from '../../api/api'
import {
    PaginationRequest,
    PaginationResponse,
    LogApp,
} from '../../types/types'
import { ErrorModel, notifyError } from '../../config/notification'
import { formatStringDateToBR } from '../../composables/dateHelper'

import dayjs, { Dayjs } from 'dayjs'

import 'dayjs/locale/pt-br'
import locale from 'ant-design-vue/es/date-picker/locale/pt_BR'

dayjs.locale('pt-br')

import type { SelectProps } from 'ant-design-vue'

interface FiltroLogState {
    entity: string | undefined
    operation: string | undefined
    userName: string | undefined
    date: [Dayjs, Dayjs]
}

export default defineComponent({
    name: 'Logs',
    components: {
        SmileOutlined,
        SearchOutlined,
    },
    props: {
        clientId: {
            type: String as PropType<string>,
        },
        viaClientScreen: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
    },
    setup(props) {
        const { goBack } = useNavigation()
        const store = useStore()
        const isAdmin = computed(() => store.state.isAdmin)

        const { clientId, viaClientScreen } = toRefs(props)
        const totalRecords = ref(0)

        let columns: any = []

        if (isAdmin.value) {
            columns.push({
                title: 'Id da Entidade',
                dataIndex: 'entityId',
                width: '15%',
            })
        }

        columns.push({
            title: 'Indentificador',
            dataIndex: 'identifier',
            width: '15%',
        })
        columns.push({
            title: 'Entidade',
            dataIndex: 'entity',
            width: '5%',
        })
        columns.push({
            title: 'Operação',
            dataIndex: 'operation',
            width: '10%',
        })
        columns.push({
            title: 'Usuário',
            dataIndex: 'userName',
            width: '15%',
        })
        columns.push({
            title: 'Data',
            dataIndex: 'date',
            width: '10%',
        })

        const pageSizeOptions = ref<string[]>(['5', '10', '20', '40', '50'])
        const data = ref<LogApp[]>([])
        const loading = ref(false)
        const pagination = ref<PaginationRequest>({
            page: 1,
            pageSize: 10,
        })

        const fetchData = async (isBySearch: boolean) => {
            loading.value = true

            const params: any = {
                requestedDateFrom: formState.date[0].toDate(),
                requestedDateTo: formState.date[1].toDate(),
                ...formState,

                ...pagination.value,
            }

            if (isBySearch) {
                params.page = 1
            }

            if (clientId.value) {
                params.clientId = clientId.value || undefined
            }

            try {
                const response = await api.get<PaginationResponse<LogApp>>(
                    '/logs',
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

        onMounted(() => fetchData(false))

        watch(pagination, () => fetchData(false), { deep: true })

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

        const formState: FiltroLogState = reactive({
            entity: undefined,
            operation: undefined,
            userName: undefined,
            date: initialDates.value,
        })

        const handlePesquisa = async () => {
            await fetchData(true)
        }
        const limpaPesquisa = async () => {
            formState.entity = undefined
            formState.operation = undefined
            formState.userName = undefined
            formState.date = initialDates.value
        }

        let entityOptions = ref<SelectProps['options']>([
            { value: '1', label: 'Usuário', visible: true },
            {
                value: '2',
                label: 'Cliente',
                visible: isAdmin.value && !viaClientScreen.value,
            },
            { value: '3', label: 'Pedido', visible: true },
            { value: '4', label: 'Hélice', visible: true },
        ])

        entityOptions.value = entityOptions.value!.filter(
            (value) => value.visible === true
        )

        let operationOptions = ref<SelectProps['options']>()

        let operationOptionsArray = ref<SelectProps['options']>([
            { value: '1', label: 'Criação' },
            { value: '2', label: 'Edição' },
            { value: '3', label: 'Exclusão' },

            { value: '4', label: 'Pedido Cancelado' },
            { value: '5', label: 'Pedido Aprovado' },
            { value: '6', label: 'Pedido Finalizado' },
            { value: '12', label: 'Pedido Negado' },

            { value: '7', label: 'Hélice Instalada' },
            { value: '10', label: 'Hélice Ativada' },
            { value: '11', label: 'Hélice Desativada' },

            { value: '8', label: 'Cliente Ativado' },
            { value: '9', label: 'Cliente Desativado' },
        ])

        const filterOption = (input: string, option: any) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }

        const handleEntityChange = (value: string) => {
            operationOptions.value = []
            formState.operation = undefined
            if (value === '1') {
                let availableOperations = ['1', '2', '3']
                operationOptions.value = operationOptionsArray.value!.filter(
                    (value) =>
                        availableOperations.includes(
                            value.value?.toString() || '0'
                        )
                )
            } else if (value === '2') {
                let availableOperations = ['2', '3', '8', '9']
                operationOptions.value = operationOptionsArray.value!.filter(
                    (value) =>
                        availableOperations.includes(
                            value.value?.toString() || '0'
                        )
                )
            } else if (value === '3') {
                let availableOperations: string[] = []

                if (isAdmin.value && !viaClientScreen.value) {
                    availableOperations = ['5', '6', '12']
                } else {
                    availableOperations = ['1', '4']
                }

                operationOptions.value = operationOptionsArray.value!.filter(
                    (value) =>
                        availableOperations.includes(
                            value.value?.toString() || '0'
                        )
                )
            } else if (value === '4') {
                let availableOperations: string[] = []

                if (isAdmin.value && !viaClientScreen.value) {
                    availableOperations = ['1', '7', '10', '11']
                } else {
                    availableOperations = ['10', '11']
                }

                operationOptions.value = operationOptionsArray.value!.filter(
                    (value) =>
                        availableOperations.includes(
                            value.value?.toString() || '0'
                        )
                )
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
            isAdmin,
            formatStringDateToBR,
            limpaPesquisa,
            handlePesquisa,
            formState,
            locale,
            rangePresets,
            dateFormat,
            operationOptions,
            entityOptions,
            filterOption,
            handleEntityChange,
        }
    },
})
</script>

<style scoped>
.content {
    border-radius: 12px;
}
</style>
