<template>
    <a-page-header
        class="pageHeader"
        title="Logs"
        sub-title="Gerencie seus logs aqui"
        @back="goBack"
    />

    <a-layout-content :style="{ margin: '10px 16px 25px' }">
        <div :style="{ padding: '20px', background: '#fff' }" class="content">
            <h3>Logs</h3>
            <a-table
                :dataSource="displayedLogs"
                :columns="columns"
                :pagination="paginationConfig"
            ></a-table>
        </div>
    </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref, computed, h } from 'vue'
import { useNavigation } from '../../composables/useNavigation'

interface Helice {
    key: string
    nome: string
    id: string
    estado: string
    cidade: string
}

export default defineComponent({
    name: 'Helices',
    setup() {
        const { goBack } = useNavigation()

        const generateLogs = (key: number): Helice => ({
            key: key.toString(),
            nome: 'Log de teste 1',
            id: (Math.random() * 1000).toFixed(0),
            estado: `Estado ${key}`,
            cidade: `Cidade ${key}`,
        })

        const logs = ref<Helice[]>(
            Array.from({ length: 5 }, (_, i) => generateLogs(i + 1))
        )

        const currentPage = ref(1)
        const pageSize = 10

        const displayedLogs = computed(() => {
            const start = (currentPage.value - 1) * pageSize
            return logs.value.slice(start, start + pageSize)
        })

        const columns = [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: 'Nome', dataIndex: 'nome', key: 'nome' },
            { title: 'Estado', dataIndex: 'estado', key: 'estado' },
            { title: 'Cidade', dataIndex: 'cidade', key: 'cidade' },
        ]

        const updateCurrentPage = (page: number) => {
            currentPage.value = page
        }

        const paginationConfig = {
            pageSize: 10,
            total: logs.value.length,
            current: currentPage.value,
            onChange: updateCurrentPage,
        }

        return {
            displayedLogs: displayedLogs,
            columns,
            paginationConfig,
            goBack,
        }
    },
})
</script>

<style scoped>
.content {
    border-radius: 12px;
}
</style>
