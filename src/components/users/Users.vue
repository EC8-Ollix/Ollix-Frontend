<template>
    <a-page-header
        class="pageHeader"
        title="Usuários"
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
import {
    defineComponent,
    ref,
    onMounted,
    watch,
    PropType,
    toRefs,
    computed,
} from 'vue'
import { useNavigation } from '../../composables/useNavigation'
import { useStore } from 'vuex'
import { SmileOutlined } from '@ant-design/icons-vue'

import { api } from '../../api/api'
import { PaginationRequest, PaginationResponse, User } from '../../types/types'
import { ErrorModel, notifyError } from '../../config/notification'

export default defineComponent({
    name: 'Users',
    components: {
        SmileOutlined,
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
        const columns = [
            {
                title: 'Nome',
                dataIndex: 'firstName',
                width: '33%',
            },
            {
                title: 'Sobrenome',
                dataIndex: 'lastName',
                width: '33%',
            },
            {
                title: 'Email',
                dataIndex: 'userEmail',
                width: '33%',
            },
        ]

        const pageSizeOptions = ref<string[]>(['5', '10', '20', '40', '50'])
        const data = ref<User[]>([])
        const loading = ref(false)
        const pagination = ref<PaginationRequest>({
            page: 1,
            pageSize: 10,
        })

        const fetchData = async () => {
            loading.value = true

            const params: any = {
                ...pagination.value,
            }

            if (clientId.value) {
                params.clientId = clientId.value || undefined
            }

            try {
                const response = await api.get<PaginationResponse<User>>(
                    '/users',
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
            isAdmin,
        }
    },
})
</script>

<style scoped>
.content {
    border-radius: 12px;
}
</style>
