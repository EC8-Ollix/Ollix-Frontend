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
                    <div v-if="showOriginalTable">
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
                                    <template
                                        v-if="column.dataIndex === 'postalCode'"
                                    >
                                        {{ record.address.postalCode }}
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
                                            column.dataIndex === 'neighborhood'
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
                                                toggleTable(record.address.id)
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
import { defineComponent, ref, onMounted, watch, PropType } from 'vue'
import { useNavigation } from '../../composables/useNavigation'
import {
    SmileOutlined,
    FileSearchOutlined,
    ArrowLeftOutlined,
    ControlOutlined,
} from '@ant-design/icons-vue'
import { api } from '../../api/api'
import {
    PaginationRequest,
    PaginationResponse,
    HeliceByAddress,
} from '../../types/types'
import { ErrorModel, notifyError } from '../../config/notification'

import HelicesByAddress from './HelicesByAddress.vue'

import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'AdressesHelices',
    components: {
        SmileOutlined,
        FileSearchOutlined,
        ArrowLeftOutlined,
        ControlOutlined,
        HelicesByAddress,
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
                width: '5%',
            },
            {
                title: 'Rua',
                dataIndex: 'street',
                width: '30%',
            },
            {
                title: 'Bairro',
                dataIndex: 'neighborhood',
                width: '25%',
            },
            {
                title: 'Cidade',
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
        const fetchData = async () => {
            loading.value = true

            const params: any = {
                installed: true,
                ...pagination.value,
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
            showOriginalTable,
            toggleTable,
            selectedAddress,
            route,
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
