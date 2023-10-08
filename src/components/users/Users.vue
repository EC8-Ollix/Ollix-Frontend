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
                :row-key="recordKey"
                :data-source="users"
                :pagination="pagination"
                :loading="isFetching"
                @change="handleTableChange"
            >
                <template #bodyCell="{ column, text }">
                    <template v-if="column.dataIndex === 'name'"
                        >{{ text.first }} {{ text.last }}</template
                    >
                </template>
            </a-table>
        </div>
    </a-layout-content>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useFetch } from '@vueuse/core'
import type { TablePaginationConfig } from 'ant-design-vue'

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

type APIParams = {
    results: number
    page?: number | undefined
    sortField?: string | undefined
    sortOrder?: string | undefined
}

type APIResult = {
    results: {
        gender: 'female' | 'male'
        name: { first: string; last: string }
        email: string
    }[]
    info: {
        page: number
        results: number
        seed: string
        version: string
    }
}

const apiParams = ref<APIParams>({ results: 20, page: 1 })

const fetchURL = computed(
    () =>
        `https://randomuser.me/api?results=${apiParams.value.results}&page=${apiParams.value.page}`
)

const {
    isFetching,
    data: rawData,
    execute,
} = useFetch<string>(fetchURL, { immediate: true })

const data = computed(() => {
    try {
        return JSON.parse(rawData.value || '')
    } catch (e) {
        console.error('Failed to parse API response:', e)
        return null
    }
})

const users = computed(() => {
    console.log('Parsed data:', data.value?.results)
    return data.value?.results || []
})

const pagination = computed(() => ({
    total: 200,
    current: apiParams.value.page,
    pageSize: apiParams.value.results,
}))

const handleTableChange = (pagination: TablePaginationConfig) => {
    apiParams.value.page = pagination.current
    apiParams.value.results = pagination.pageSize || 0
    execute()
}

const recordKey = (record: { login: { uuid: string } }) => record.login.uuid
</script>

<style scoped>
.content {
    border-radius: 12px;
}
</style>
