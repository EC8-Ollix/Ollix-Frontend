<template>
    <a-page-header
        class="pageHeader"
        title="Usuários"
        sub-title="Gerencie os Usuários por aqui"
        @back="() => null"
    />

    <a-layout-content :style="{ margin: '10px 16px 25px' }">
        <div :style="{ padding: '20px', background: '#fff' }" class="content">
            <a-table
                :columns="columns"
                :row-key="(record) => record.login.uuid"
                :data-source="data"
                :pagination="tableParams.pagination"
                :loading="loading"
                @change="handleTableChange"
            >
                <template #bodyCell="{ column, text }">
                    <template v-if="column.dataIndex === 'name'">
                        {{ text.first }} {{ text.last }}
                    </template>
                </template>
            </a-table>
        </div>
    </a-layout-content>
</template>

<script lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue'
import axios from 'axios'
import { Table } from 'ant-design-vue'
import type { TablePaginationConfig, TableProps } from 'ant-design-vue'
import { FilterValue, SorterResult } from 'ant-design-vue/es/table/interface'

interface DataType {
    name: {
        first: string
        last: string
    }
    gender: string
    email: string
    login: {
        uuid: string
    }
}

interface TableParams {
    pagination?: { current?: number; pageSize?: number; total?: number }
    sorter?: { sorterField?: string; sorterOrder?: string }
}

export default {
    name: 'AjaxTable',
    components: { 'a-table': Table },

    setup() {
        const data = ref<DataType[]>([])
        const loading = ref(false)
        const tableParams = reactive<TableParams>({
            pagination: {
                current: 1,
                pageSize: 10,
            },
            sorter: {},
        })

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                sorter: true,
                width: '20%',
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                filters: [
                    { text: 'Male', value: 'male' },
                    { text: 'Female', value: 'female' },
                ],
                width: '20%',
            },
            {
                title: 'Email',
                dataIndex: 'email',
            },
        ]

        const fetchData = async () => {
            loading.value = true
            try {
                const response = await axios.get(`https://randomuser.me/api?`, {
                    params: {
                        results: tableParams.pagination?.pageSize,
                        page: tableParams.pagination?.current,
                        ...tableParams,
                    },
                })

                data.value = response.data.results
                tableParams.pagination!.total = 200
            } catch (error) {
                console.error('Failed to fetch data:', error)
            } finally {
                loading.value = false
            }
        }

        onMounted(fetchData)

        watch(() => tableParams, fetchData, { deep: true })

        const handleTableChange = (
            pagination: TablePaginationConfig,
            sorter: SorterResult<string> | SorterResult<string>[]
        ) => {
            tableParams.pagination = pagination

            let firstSorter: SorterResult<string> = getFirstSorter(sorter)

            tableParams.sorter!.sorterField = firstSorter.field?.toString()
            tableParams.sorter!.sorterOrder = firstSorter.order?.toString()

            if (pagination.pageSize !== tableParams.pagination?.pageSize) {
                data.value = []
            }
        }

        return {
            data,
            loading,
            tableParams,
            columns,
            handleTableChange,
        }

        function getFirstSorter(
            sorter: SorterResult<string> | SorterResult<string>[]
        ) {
            let firstSorter: SorterResult<string>
            if (Array.isArray(sorter)) {
                firstSorter = sorter[0]
            } else {
                firstSorter = sorter
            }
            return firstSorter
        }
    },
}
</script>

<style scoped>
.content {
    border-radius: 12px;
}
</style>
