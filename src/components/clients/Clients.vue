<template>
    <a-page-header class="pageHeader" title="Clientes" @back="goBack">
    </a-page-header>

    <a-layout-content :style="{ margin: '10px 16px 25px' }">
        <div :style="{ padding: '20px', background: '#fff' }" class="content">
            <div class="filtros">
                <h3>Filtros</h3>
                <a-row>
                    <a-col class="filtros-input" :span="22">
                        <a-row>
                            <a-col :span="8">
                                <div>
                                    <div class="perso-label">Razão Social</div>
                                    <a-input
                                        v-model:value="formState.companyName"
                                        placeholder="Razão Social"
                                    >
                                    </a-input>
                                </div>
                            </a-col>
                            <a-col :span="8">
                                <div>
                                    <div class="perso-label">Nome Fantasia</div>
                                    <a-input
                                        v-model:value="formState.bussinessName"
                                        placeholder="Nome Fantasia"
                                    >
                                    </a-input>
                                </div>
                            </a-col>
                            <a-col :span="4">
                                <div>
                                    <div class="perso-label">CNPJ</div>
                                    <a-input
                                        v-model:value="formState.cnpj"
                                        placeholder="CNPJ"
                                    >
                                    </a-input>
                                </div>
                            </a-col>
                            <a-col :span="4">
                                <div>
                                    <div class="perso-label">Ativo/Inativo</div>

                                    <a-select
                                        v-model:value="formState.active"
                                        placeholder="Ativo/Inativo"
                                        style="width: 100%"
                                    >
                                        <a-select-option value="true"
                                            >Ativo</a-select-option
                                        >
                                        <a-select-option value="false"
                                            >Inativo</a-select-option
                                        >
                                    </a-select>
                                </div>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col class="filtros-button" :span="2">
                        <a-row>
                            <a-col :span="24">
                                <div class="button-form-item">
                                    <a-button
                                        type="primary"
                                        html-type="submit"
                                        style="width: 100%"
                                        @click="handlePesquisa"
                                    >
                                        Pesquisar
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
                            <template v-if="column.dataIndex === 'cnpj'">
                                {{ record.cnpj.value }}
                            </template>
                            <template v-else-if="column.dataIndex === 'active'">
                                <div class="align-column-center">
                                    <a-popconfirm
                                        @confirm="
                                            toggleActive(record as ClientsData)
                                        "
                                        :title="
                                            record.active
                                                ? 'Tem certeza que deseja desativar essa Cliente?'
                                                : 'Tem certeza que deseja ativar essa Cliente?'
                                        "
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
                                </div>
                            </template>
                            <template
                                v-else-if="column.dataIndex === 'actions'"
                            >
                                <router-link
                                    :to="{
                                        name: 'clientDetails',
                                        params: { clientId: record.id },
                                        query: {
                                            pagination:
                                                JSON.stringify(pagination),
                                        },
                                    }"
                                >
                                    <a-button size="small"
                                        ><FileSearchOutlined />Detalhes</a-button
                                    >
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
        </div>
    </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, reactive } from 'vue'
import {
    AppleOutlined,
    AndroidOutlined,
    SmileOutlined,
    FileSearchOutlined,
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

interface FiltroClientState {
    companyName: string | undefined
    bussinessName: string | undefined
    cnpj: string | undefined
    active: string
}

export default defineComponent({
    name: 'Clients',
    components: {
        AppleOutlined,
        AndroidOutlined,
        SmileOutlined,
        FileSearchOutlined,
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

            const params = {
                ...formState,
                ...pagination.value,
            }

            try {
                const response = await api.get<PaginationResponse<ClientsData>>(
                    '/clients',
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

        const route = useRoute()
        onMounted(() => {
            if (route.query.pagination) {
                pagination.value = JSON.parse(
                    route.query.pagination as string
                ) as PaginationRequest
            } else {
                fetchData()
            }
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

        const formState: FiltroClientState = reactive({
            companyName: undefined,
            bussinessName: undefined,
            cnpj: undefined,
            active: 'true',
        })

        const handlePesquisa = async () => {
            await fetchData()
        }
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
            FileSearchOutlined,
            formState,
            handlePesquisa,
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
