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
                                        placeholder="Solicitante"
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
                            <!-- <a-col :span="1"> </a-col> -->
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
            <div class="actions" v-if="!isAdmin">
                <a-row style="place-content: start">
                    <a-col>
                        <a-button
                            type="default"
                            :icon="h(PlusOutlined)"
                            @click="visible = true"
                            >Novo Pedido</a-button
                        >
                    </a-col>
                </a-row>
            </div>

            <a-modal
                v-model:open="visible"
                title="Realize seu Pedido de Hélices!"
                :confirm-loading="confirmLoading"
                width="750px"
            >
                <a-form
                    ref="formRef"
                    :rules="rules"
                    :model="newOrderState"
                    layout="vertical"
                    name="form_in_modal"
                >
                    <a-row style="margin-top: 15px">
                        <a-col :span="12">
                            <a-form-item name="requesterName" label="Nome">
                                <a-input
                                    v-model:value="newOrderState.requesterName"
                                    placeholder="Nome"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="1"> </a-col>
                        <a-col :span="11">
                            <a-form-item name="requesterEmail" label="Email">
                                <a-input
                                    v-model:value="newOrderState.requesterEmail"
                                    placeholder="Email"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-form-item name="observation" label="Observação">
                        <a-textarea
                            v-model:value="newOrderState.observation"
                            placeholder="Observação"
                        />
                    </a-form-item>
                    <a-row style="margin-top: 15px">
                        <a-col :span="3">
                            <a-form-item
                                name="quantityRequested"
                                label="Quantidade"
                            >
                                <a-input-number
                                    v-model:value="
                                        newOrderState.quantityRequested
                                    "
                                    placeholder="Qtde"
                                    :min="1"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="1"> </a-col>
                        <a-col :span="5">
                            <a-form-item name="postalCode" label="CEP">
                                <a-input
                                    v-model:value="newOrderState.postalCode"
                                    placeholder="CEP"
                                    :max-length="9"
                                    :min-length="9"
                                    @input="onInputCep"
                                    style="width: 100%"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="1"> </a-col>
                        <a-col :span="14">
                            <a-form-item name="address" label="Endereço">
                                <a-input
                                    v-model:value="newOrderState.street"
                                    placeholder="Endereço"
                                    :readonly="true"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="9">
                            <a-form-item name="neighborhood" label="Bairro">
                                <a-input
                                    v-model:value="newOrderState.neighborhood"
                                    placeholder="Bairro"
                                    :readonly="true"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="1"> </a-col>
                        <a-col :span="14">
                            <a-form-item name="cityState" label="Cidade/Estado">
                                <a-input
                                    v-model:value="newOrderState.cityState"
                                    placeholder="Cidade/Estado"
                                    :readonly="true"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
                <template #footer>
                    <a-button style="margin-left: 10px" @click="resetForm"
                        >Limpar</a-button
                    >
                    <a-button type="primary" @click="onNewOrderConfirm"
                        >Confirmar Pedido</a-button
                    >
                </template>
            </a-modal>

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
    toRaw,
} from 'vue'
import {
    SmileOutlined,
    FileTextOutlined,
    SearchOutlined,
    PlusOutlined,
    CheckOutlined,
} from '@ant-design/icons-vue'
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
import {
    ErrorModel,
    notifyError,
    notifySuccess,
} from '../../config/notification'

import { getTagForOrderStatus } from '../../types/order/orderStatus'

import dayjs, { Dayjs } from 'dayjs'

import 'dayjs/locale/pt-br'
import locale from 'ant-design-vue/es/date-picker/locale/pt_BR'

dayjs.locale('pt-br')

import type { FormInstance } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import axios from 'axios'
import { Modal } from 'ant-design-vue'

import { createVNode } from 'vue'

interface NewOrderState {
    requesterName: string
    requesterEmail: string
    observation: string
    postalCode: string
    quantityRequested: number
    street: string
    neighborhood: string
    cityState: string
}

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
        SearchOutlined,
        PlusOutlined,
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

        let columns = [
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

        if (!isAdmin.value) {
            columns = columns.filter((column) => column.dataIndex !== 'client')
        }

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
        const cepValid = ref(true)

        const rules: Record<string, Rule[]> = {
            requesterName: [
                {
                    required: true,
                    message: 'Digite o nome do solicitante',
                    trigger: 'change',
                },
                {
                    max: 200,
                    message:
                        'O Nome do Solicitante deve ter no máximo 200 caracteres',
                    trigger: 'blur',
                },
            ],
            requesterEmail: [
                {
                    required: true,
                    message: 'Digite o nome do solicitante',
                    trigger: 'change',
                },
                {
                    max: 200,
                    message:
                        'O Nome do Solicitante deve ter no máximo 200 caracteres',
                    trigger: 'blur',
                },
            ],
            observation: [
                {
                    max: 600,
                    message: 'A Observação deve ter no máximo 200 caracteres',
                    trigger: 'blur',
                },
            ],
            quantityRequested: [
                {
                    required: true,
                    message: 'Obrigatório',
                    trigger: 'change',
                },
                {
                    validator: (_, value) => {
                        if (value > 0) {
                            return Promise.resolve()
                        }
                        return Promise.reject('Obrigatório')
                    },
                    trigger: 'change',
                },
            ],
            postalCode: [
                {
                    required: true,
                    message: 'O CEP é obrigatório',
                    trigger: 'change',
                },
                {
                    min: 9,
                    max: 9,
                    message: 'CEP Inválido',
                    trigger: 'blur',
                },
                {
                    validator: (_, value) => {
                        if (cepValid.value) {
                            return Promise.resolve()
                        }
                        return Promise.reject('CEP Inválido')
                    },
                    trigger: 'blur',
                },
            ],
        }

        const newOrderStepOne = ref<boolean>(false)
        const confirmLoading = ref<boolean>(false)
        const formRef = ref<FormInstance>()
        const visible = ref(false)
        const newOrderState = reactive<NewOrderState>({
            requesterName: '',
            requesterEmail: '',
            observation: '',
            postalCode: '',
            street: '',
            neighborhood: '',
            cityState: '',
            quantityRequested: 0,
        })

        const formatCEP = (value: string) => {
            const valueOnlyNumbers = value.replace(/[^\d]/g, '')
            let formattedCEP = valueOnlyNumbers

            if (valueOnlyNumbers.length > 5) {
                formattedCEP = `${valueOnlyNumbers.slice(
                    0,
                    5
                )}-${valueOnlyNumbers.slice(5, 8)}`
            } else {
                formattedCEP = valueOnlyNumbers
            }

            return formattedCEP.slice(0, 9)
        }

        const onInputCep = (event: Event) => {
            const target = event.target as HTMLInputElement
            const value = target.value
            newOrderState.postalCode = formatCEP(value)

            if (newOrderState.postalCode.length === 9) {
                fetchAddressFromCEP(value)
            }
        }

        const fetchAddressFromCEP = async (cep: string) => {
            try {
                newOrderState.street = ''
                newOrderState.neighborhood = ''
                newOrderState.cityState = ''

                const cepWithoutDash = cep.replace('-', '')
                const response = await axios.get(
                    `https://viacep.com.br/ws/${cepWithoutDash}/json/`
                )

                if (response.data && response.data.logradouro) {
                    newOrderState.street = `${response.data.logradouro}`
                    newOrderState.neighborhood = `${response.data.bairro}`
                    newOrderState.cityState = `${response.data.localidade}/${response.data.uf}`
                    cepValid.value = true
                } else {
                    InvalidCep()
                    cepValid.value = false
                }
            } catch (error) {
                InvalidCep()
                cepValid.value = false
            }

            function InvalidCep() {
                newOrderState.street = 'Verifique seu CEP'
                newOrderState.neighborhood = 'Verifique seu CEP'
                newOrderState.cityState = 'Verifique seu CEP'
            }
        }

        const onNewOrderConfirm = async () => {
            await formRef
                .value!.validate()
                .then(async () => {
                    confirmLoading.value = true
                    try {
                        await api.post('/orders', newOrderState)
                        await fetchData()
                        confirmLoading.value = false

                        successOrderCreated()
                    } catch (error: any) {
                        confirmLoading.value = false
                        let erroModel: ErrorModel = error?.response?.data
                        notifyError(erroModel)
                    }
                })
                .catch((error) => {})
        }

        const successOrderCreated = () => {
            Modal.confirm({
                title: 'Pedido Realizado com Sucesso!',
                icon: h(CheckOutlined, { style: 'color:green;' }),
                content: h(
                    'div',
                    { style: 'padding-bottom:15px;' },
                    'Deseja realizar um novo Pedido?'
                ),
                okText: 'Sim',
                okType: 'primary',
                cancelText: 'Não, obrigado',
                onOk() {
                    newOrderState.street = ''
                    newOrderState.neighborhood = ''
                    newOrderState.cityState = ''
                    newOrderState.observation = ''
                    newOrderState.postalCode = ''
                    newOrderState.quantityRequested = 0
                },
                onCancel() {
                    visible.value = false
                    resetForm()
                },
                centered: true,
            })
        }
        const resetForm = () => {
            formRef.value!.resetFields()
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
            SearchOutlined,
            PlusOutlined,
            onNewOrderConfirm,
            newOrderState,
            formRef,
            visible,
            confirmLoading,
            rules,
            newOrderStepOne,
            onInputCep,
            resetForm,
        }
    },
})
</script>

<style scoped>
.content {
    border-radius: 12px;
}

.actions {
    text-align: end;
    margin-bottom: 1rem;
}
</style>
