<template>
    <a-page-header
        class="pageHeader"
        title="Hélices"
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
            <transition name="slide">
                <div>
                    <div class="filtros">
                        <h3>Filtros</h3>
                        <a-row>
                            <a-col class="filtros-input" :span="20">
                                <a-row>
                                    <a-col :span="3">
                                        <div>
                                            <div class="perso-label">
                                                <a-tooltip
                                                    title="Ao informar o CEP, os demais campos não poderão ser alterados"
                                                >
                                                    <InfoCircleOutlined
                                                        style="
                                                            margin-right: 5px;
                                                            font-size: 12px;
                                                        "
                                                    />
                                                </a-tooltip>
                                                CEP
                                            </div>

                                            <a-input
                                                v-model:value="
                                                    formState.postalCode
                                                "
                                                placeholder="CEP"
                                                :max-length="9"
                                                :min-length="9"
                                                @input="onInputCep"
                                                style="width: 100%"
                                            />
                                        </div>
                                    </a-col>
                                    <a-col :span="6">
                                        <div>
                                            <div class="perso-label">Rua</div>
                                            <a-input
                                                v-model:value="formState.street"
                                                placeholder="Rua"
                                                :disabled="isCepInformed"
                                            >
                                            </a-input>
                                        </div>
                                    </a-col>
                                    <a-col :span="6">
                                        <div>
                                            <div class="perso-label">
                                                Bairro
                                            </div>
                                            <a-input
                                                v-model:value="
                                                    formState.neighborhood
                                                "
                                                placeholder="Bairro"
                                                :disabled="isCepInformed"
                                            >
                                            </a-input>
                                        </div>
                                    </a-col>
                                    <a-col :span="6">
                                        <div>
                                            <div class="perso-label">
                                                <a-tooltip
                                                    title="Escolha um Estado para selecionar uma Cidade"
                                                >
                                                    <InfoCircleOutlined
                                                        style="
                                                            margin-right: 5px;
                                                            font-size: 12px;
                                                        "
                                                    />
                                                </a-tooltip>
                                                Cidade
                                            </div>
                                            <a-config-provider>
                                                <template #renderEmpty>
                                                    <div
                                                        style="
                                                            text-align: center;
                                                            padding: 10px;
                                                        "
                                                    >
                                                        <smile-outlined
                                                            style="
                                                                font-size: 15px;
                                                            "
                                                        />
                                                        <p>Nada encontrado</p>
                                                    </div>
                                                </template>
                                                <a-select
                                                    v-model:value="
                                                        formState.city
                                                    "
                                                    show-search
                                                    placeholder="Cidade"
                                                    style="width: 100%"
                                                    :options="cityOptions"
                                                    :filter-option="
                                                        filterOption
                                                    "
                                                    :allowClear="true"
                                                    :disabled="isCepInformed"
                                                ></a-select>
                                            </a-config-provider>
                                        </div>
                                    </a-col>
                                    <a-col :span="3">
                                        <div>
                                            <div class="perso-label">
                                                Estado
                                            </div>
                                            <a-config-provider>
                                                <template #renderEmpty>
                                                    <div
                                                        style="
                                                            text-align: center;
                                                            padding: 10px;
                                                        "
                                                    >
                                                        <smile-outlined
                                                            style="
                                                                font-size: 15px;
                                                            "
                                                        />
                                                        <p>Nada encontrado</p>
                                                    </div>
                                                </template>
                                                <a-select
                                                    v-model:value="
                                                        formState.state
                                                    "
                                                    show-search
                                                    placeholder="Estado"
                                                    style="width: 100%"
                                                    :options="stateOptions"
                                                    :filter-option="
                                                        filterOption
                                                    "
                                                    @change="handleStateChange"
                                                    :allowClear="true"
                                                    :disabled="isCepInformed"
                                                ></a-select>
                                            </a-config-provider>
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
                    <div v-if="showOriginalTable">
                        <div class="table-results">
                            <a-config-provider>
                                <template #renderEmpty>
                                    <div
                                        style="
                                            text-align: center;
                                            padding: 25px;
                                        "
                                    >
                                        <smile-outlined
                                            style="font-size: 20px"
                                        />
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
                                    <template
                                        #bodyCell="{ column, text, record }"
                                    >
                                        <template
                                            v-if="
                                                column.dataIndex ===
                                                'postalCode'
                                            "
                                        >
                                            {{
                                                formatCEP(
                                                    record.address.postalCode
                                                )
                                            }}
                                        </template>
                                        <template
                                            v-else-if="
                                                column.dataIndex === 'street'
                                            "
                                        >
                                            {{ record.address.street }}
                                        </template>
                                        <template
                                            v-else-if="
                                                column.dataIndex ===
                                                'neighborhood'
                                            "
                                        >
                                            {{ record.address.neighborhood }}
                                        </template>
                                        <template
                                            v-else-if="
                                                column.dataIndex === 'cityState'
                                            "
                                        >
                                            {{ record.address.city }}/{{
                                                record.address.state
                                            }}
                                        </template>
                                        <template
                                            v-else-if="
                                                column.dataIndex === 'actions'
                                            "
                                        >
                                            <a-button
                                                size="small"
                                                @click="
                                                    toggleTable(
                                                        record.address.id
                                                    )
                                                "
                                                ><ControlOutlined />Hélices</a-button
                                            >
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
                    <div v-if="!showOriginalTable">
                        <a-button
                            title="voltar"
                            shape="circle"
                            type="text"
                            style="margin-bottom: 15px"
                            @click="toggleTable('')"
                            ><ArrowLeftOutlined
                        /></a-button>

                        <HelicesByAddress
                            :clientId="(route.params.clientId as string)"
                            :addressId="selectedAddress"
                            :viaClientScreen="true"
                        />
                    </div>
                </div>
            </transition>
        </div>
    </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, PropType, reactive } from 'vue'
import { useNavigation } from '../../composables/useNavigation'
import {
    SmileOutlined,
    FileSearchOutlined,
    ArrowLeftOutlined,
    ControlOutlined,
    SearchOutlined,
    InfoCircleOutlined,
} from '@ant-design/icons-vue'
import { api } from '../../api/api'
import {
    PaginationRequest,
    PaginationResponse,
    HeliceByAddress,
    AddressApp,
} from '../../types/types'
import { ErrorModel, notifyError } from '../../config/notification'

import HelicesByAddress from './HelicesByAddress.vue'

import { useRoute } from 'vue-router'

interface FiltroHelicesState {
    postalCode: string | undefined
    street: string | undefined
    neighborhood: string | undefined
    city: string | undefined
    state: string | undefined
}
import axios from 'axios'
import type { SelectProps } from 'ant-design-vue'

export default defineComponent({
    name: 'AdressesHelices',
    components: {
        SmileOutlined,
        FileSearchOutlined,
        ArrowLeftOutlined,
        ControlOutlined,
        SearchOutlined,
        HelicesByAddress,
        InfoCircleOutlined,
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
        const showOriginalTable = ref(true)
        const selectedAddress = ref<string>('')
        function toggleTable(addressId: string) {
            selectedAddress.value = addressId
            showOriginalTable.value = !showOriginalTable.value
        }

        const { goBack } = useNavigation()
        const totalRecords = ref(0)
        const columns = [
            {
                title: 'CEP',
                dataIndex: 'postalCode',
                width: '7%',
            },
            {
                title: 'Rua',
                dataIndex: 'street',
                width: '27%',
            },
            {
                title: 'Bairro',
                dataIndex: 'neighborhood',
                width: '25%',
            },
            {
                title: 'Cidade/Estado',
                dataIndex: 'cityState',
                width: '25%',
            },
            {
                title: 'Qtd. de Hélices',
                dataIndex: 'propellersCount',
                width: '10%',
            },
            {
                title: 'Ações',
                dataIndex: 'actions',
                width: '5%',
            },
        ]

        const pageSizeOptions = ref<string[]>(['5', '10', '20', '40', '50'])
        const data = ref<HeliceByAddress[]>([])
        const loading = ref(false)
        const pagination = ref<PaginationRequest>({
            page: 1,
            pageSize: 10,
        })

        const route = useRoute()
        const fetchData = async (isBySearch: boolean) => {
            await updateAddresses()
            loading.value = true

            const params: any = {
                installed: true,
                ...formState,
                ...pagination.value,
            }

            if (isBySearch) {
                params.page = 1
            }

            if (route.params.clientId) {
                params.clientId = route.params.clientId
            }

            try {
                const response = await api.get<
                    PaginationResponse<HeliceByAddress>
                >('/propellers/propeller-adresses', {
                    params: params,
                })

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
        const stateOptions = ref<SelectProps['options']>([])

        onMounted(() => fetchData(false))

        let addresses: AddressApp[] = []
        const updateAddresses = async () => {
            try {
                const response = await api.get<AddressApp[]>('/adresses', {
                    params: {
                        clientId: route.params.clientId,
                    },
                })

                addresses = response.data

                // stateOptions.value = addresses.map((address) => ({
                //     value: address.state,
                //     label: address.state,
                // }))

                const uniqueStates = new Set()

                stateOptions.value = addresses
                    .filter((address) => {
                        if (!uniqueStates.has(address.state)) {
                            uniqueStates.add(address.state)
                            return true
                        }
                        return false
                    })
                    .map((address) => ({
                        value: address.state,
                        label: address.state,
                    }))
            } catch (error: any) {
                let erroModel: ErrorModel = error?.response?.data
                notifyError(erroModel)
            }
        }

        watch(pagination, () => fetchData(false), { deep: true })

        const onShowSizeChange = (current: number, pageSize: number) => {
            pagination.value.page = current
            pagination.value.pageSize = pageSize

            if (pageSize !== pagination?.value.pageSize) {
                data.value = []
            }
        }

        const handlePesquisa = async () => {
            showOriginalTable.value = true
            await fetchData(true)
        }

        const formState: FiltroHelicesState = reactive({
            postalCode: undefined,
            street: undefined,
            neighborhood: undefined,
            city: undefined,
            state: undefined,
        })

        const limpaPesquisa = () => {
            isCepInformed.value = false
            ;(formState.postalCode = undefined),
                (formState.street = undefined),
                (formState.neighborhood = undefined),
                (formState.city = undefined),
                (formState.state = undefined)
        }

        const cepValid = ref(true)
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

        const isCepInformed = ref(false)

        const onInputCep = (event: Event) => {
            const target = event.target as HTMLInputElement
            const value = target.value
            formState.postalCode = formatCEP(value)

            formState.street = ''
            formState.neighborhood = ''
            formState.city = undefined
            formState.state = undefined

            if (formState.postalCode.length > 0) {
                isCepInformed.value = true
            } else {
                isCepInformed.value = false
            }

            if (formState.postalCode.length === 9) {
                fetchAddressFromCEP(value)
            } else if (formState.postalCode.length > 0) {
                InvalidCep()
            }
        }
        function InvalidCep() {
            formState.street = 'Verifique seu CEP'
            formState.neighborhood = 'Verifique seu CEP'
            formState.city = 'Verifique seu CEP'
            formState.state = 'Verifique seu CEP'
        }

        const fetchAddressFromCEP = async (cep: string) => {
            try {
                const cepWithoutDash = cep.replace('-', '')
                const response = await axios.get(
                    `https://viacep.com.br/ws/${cepWithoutDash}/json/`
                )

                if (response.data && response.data.logradouro) {
                    formState.street = `${response.data.logradouro}`
                    formState.neighborhood = `${response.data.bairro}`
                    formState.city = `${response.data.localidade}`
                    formState.state = `${response.data.uf}`
                    cepValid.value = true
                } else {
                    InvalidCep()
                    cepValid.value = false
                }
            } catch (error) {
                InvalidCep()
                cepValid.value = false
            }
        }

        const filterOption = (input: string, option: any) => {
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }

        const cityOptions = ref<SelectProps['options']>([])
        const isLoadingCityOptions = ref<boolean>(false)

        const handleStateChange = (value: string) => {
            isLoadingCityOptions.value = true

            const filteredCities = addresses
                .filter((address) => address.state === value)
                .map((address) => address.city)

            const distinctCities = Array.from(new Set(filteredCities))

            cityOptions.value = distinctCities.map((city) => ({
                value: city,
                label: city,
            }))

            isLoadingCityOptions.value = false
        }

        const focusCity = () => {
            console.log('focus')
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
            showOriginalTable,
            toggleTable,
            selectedAddress,
            route,
            limpaPesquisa,
            handlePesquisa,
            formState,
            onInputCep,
            handleStateChange,
            stateOptions,
            filterOption,
            isCepInformed,
            cityOptions,
            isLoadingCityOptions,
            formatCEP,
        }
    },
})
</script>

<style scoped>
.content {
    border-radius: 12px;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s;
}
.slide-enter,
.slide-leave-to {
    transform: translateX(100%);
}
</style>
