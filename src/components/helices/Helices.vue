<template>
    <a-page-header
        class="pageHeader"
        title="Hélices"
        sub-title="Gerencie suas hélices aqui"
        @back="() => null"
    />

    <a-layout-content :style="{ margin: '10px 16px 25px' }">
        <div :style="{ padding: '20px', background: '#fff' }" class="content">
            <a-button @click="addHelice">Adicionar Hélice</a-button>
            <a-divider />
            <h3>Lista de Hélices</h3>
            <a-table
                :dataSource="displayedHelices"
                :columns="columns"
                :pagination="paginationConfig"
            ></a-table>
        </div>
    </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref, computed, h } from 'vue'

interface Helice {
    key: string
    onOff: boolean
    id: string
    estado: string
    cidade: string
}

export default defineComponent({
    name: 'Helices',
    setup() {
        const generateHelice = (key: number): Helice => ({
            key: key.toString(),
            onOff: Math.random() > 0.5,
            id: (Math.random() * 1000).toFixed(0),
            estado: `Estado ${key}`,
            cidade: `Cidade ${key}`,
        })

        const helices = ref<Helice[]>(
            Array.from({ length: 5 }, (_, i) => generateHelice(i + 1))
        )

        const currentPage = ref(1)
        const pageSize = 10

        const displayedHelices = computed(() => {
            const start = (currentPage.value - 1) * pageSize
            return helices.value.slice(start, start + pageSize)
        })

        const columns = [
            {
                title: 'On/Off',
                dataIndex: 'onOff',
                key: 'onOff',
                customRender: ({ record }: { record: Helice }) => {
                    return h('a-switch', {
                        modelValue: record.onOff,
                    })
                },
            },
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: 'Estado', dataIndex: 'estado', key: 'estado' },
            { title: 'Cidade', dataIndex: 'cidade', key: 'cidade' },
        ]

        const addHelice = () => {
            const newHelice: Helice = generateHelice(helices.value.length + 1)
            helices.value.push(newHelice)
        }

        const updateCurrentPage = (page: number) => {
            currentPage.value = page
        }

        const paginationConfig = {
            pageSize: 10,
            total: helices.value.length,
            current: currentPage.value,
            onChange: updateCurrentPage,
        }

        return { displayedHelices, columns, addHelice, paginationConfig }
    },
})
</script>

<style scoped>
.content {
    border-radius: 12px;
}
</style>
