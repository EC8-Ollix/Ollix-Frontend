<template>
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
                <template v-if="column.dataIndex === 'active'">
                    <div class="align-column-center">
                        <a-popconfirm
                            @confirm="toggleActive(record as Helice)"
                            :title="
                                record.active
                                    ? 'Tem certeza que deseja desativar essa Hélice?'
                                    : 'Tem certeza que deseja ativar essa Hélice?'
                            "
                            placement="topRight"
                        >
                            <a-switch
                                :checked="record.active"
                                :loading="record.isLoading"
                                size="small"
                                @change="handleSwitchChange(record as Helice)"
                            ></a-switch>
                        </a-popconfirm>
                    </div>
                </template>
                <template v-else-if="column.dataIndex === 'installedDate'">
                    {{ formatStringDateToBR(record.order.installationDate) }}
                </template>
                <template v-else-if="column.dataIndex === 'addressApp'">
                    {{ record.addressApp.street }},
                    {{ record.addressApp.neighborhood }} -
                    {{ record.addressApp.city }}/{{ record.addressApp.state }}
                </template>
                <template v-else-if="column.dataIndex === 'actions'">
                    <a-button size="small"
                        ><FileSearchOutlined />Detalhes</a-button
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
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, PropType, toRefs } from 'vue'
import {
    SmileOutlined,
    FileSearchOutlined,
    ArrowLeftOutlined,
} from '@ant-design/icons-vue'
import { api } from '../../api/api'
import {
    PaginationRequest,
    PaginationResponse,
    Helice,
} from '../../types/types'
import { ErrorModel, notifyError } from '../../config/notification'
import { formatStringDateToBR } from '../../composables/dateHelper'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'HelicesByAddress',
    components: {
        SmileOutlined,
        FileSearchOutlined,
    },
    props: {
        clientId: {
            type: String as PropType<string>,
        },
        addressId: {
            type: String as PropType<string>,
        },
        viaClientScreen: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
    },
    setup(props) {
        const { clientId, addressId } = toRefs(props)
        const totalRecords = ref(0)
        const columns = [
            {
                title: '',
                dataIndex: 'active',
                width: '3%',
            },
            {
                title: 'Hélice Id',
                dataIndex: 'helixId',
                width: '30%',
            },
            {
                title: 'Data da Instalação',
                dataIndex: 'installedDate',
                width: '15%',
            },
            {
                title: 'Endereço',
                dataIndex: 'addressApp',
                width: '40%',
            },
            {
                title: 'Ações',
                dataIndex: 'actions',
                width: '10%',
            },
        ]

        const pageSizeOptions = ref<string[]>(['5', '10', '20', '40', '50'])
        const data = ref<Helice[]>([])
        const loading = ref(false)
        const pagination = ref<PaginationRequest>({
            page: 1,
            pageSize: 10,
        })

        const fetchData = async () => {
            if (!clientId.value || !addressId.value) {
                return
            }

            loading.value = true

            const params: any = {
                clientId: clientId.value,
                addressId: addressId.value,
                installed: true,
                ...pagination.value,
            }

            try {
                const response = await api.get<PaginationResponse<Helice>>(
                    '/propellers/by-address',
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

        const toggleActive = async (record: Helice) => {
            record.isLoading = true
            try {
                await api.patch(`/propellers/${record.id}/toggle`)
                record.active = !record.active
            } catch (error: any) {
                let erroModel: ErrorModel = error?.response?.data
                notifyError(erroModel)
            } finally {
                record.isLoading = false
            }
        }

        const handleSwitchChange = (record: Helice) => {}

        return {
            data,
            loading,
            pagination,
            columns,
            onShowSizeChange,
            pageSizeOptions,
            totalRecords,
            formatStringDateToBR,
            toggleActive,
            handleSwitchChange,
        }
    },
})
</script>

<style scoped>
.content {
    border-radius: 12px;
}
</style>
