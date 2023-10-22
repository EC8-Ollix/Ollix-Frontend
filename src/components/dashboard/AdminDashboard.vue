<template>
    <a-layout-content :style="{ margin: '10px 16px 25px' }">
        <a-row :gutter="16" style="margin-bottom: 1rem">
            <a-col :span="6">
                <a-card
                    :bordered="false"
                    style="height: 175px"
                    :loading="loading"
                >
                    <p style="font-size: 1rem; color: #3c3535">
                        <component
                            :is="
                                getTagForOrderStatus(OrderStatus.Completed).icon
                            "
                        />
                        Pedidos Finalizados
                    </p>
                    <p style="font-size: 1.8rem; color: #3c3535">126</p>
                    <span style="font-size: 0.7rem">(Nos últimos 30 dias)</span>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card
                    :bordered="false"
                    style="height: 175px"
                    :loading="loading"
                >
                    <p style="font-size: 1rem; color: #3c3535">
                        <component
                            :is="getTagForOrderStatus(OrderStatus.Denied).icon"
                        />
                        Pedidos Negados
                    </p>
                    <p style="font-size: 1.8rem; color: #3c3535">18</p>
                    <span style="font-size: 0.7rem">(Nos últimos 30 dias)</span>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card
                    :bordered="false"
                    style="height: 175px"
                    :loading="loading"
                >
                    <p style="font-size: 1rem; color: #3c3535">
                        <component
                            :is="getTagForOrderStatus(OrderStatus.Cancel).icon"
                        />
                        Pedidos Cancelados
                    </p>
                    <p style="font-size: 1.8rem; color: #3c3535">37</p>
                    <span style="font-size: 0.7rem">(Nos últimos 30 dias)</span>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card
                    :bordered="false"
                    style="height: 175px"
                    :loading="loading"
                >
                    <p style="font-size: 1rem; color: #3c3535">
                        <component
                            :is="
                                getTagForOrderStatus(
                                    OrderStatus.InstallationPending
                                ).icon
                            "
                        />
                        Pedidos Pendentes
                    </p>
                    <p style="font-size: 1.8rem; color: #3c3535">80</p>
                    <span style="font-size: 0.7rem">(Nos últimos 30 dias)</span>
                </a-card>
            </a-col>
        </a-row>

        <a-row :gutter="16" style="margin-bottom: 1rem; min-height: 290px">
            <a-col :span="12">
                <a-card
                    :bordered="false"
                    :loading="loading"
                    style="min-height: 290px"
                >
                    <p style="font-size: 1.1rem; color: #3c3535">
                        Principais Clientes Ativos
                    </p>

                    <a-list
                        item-layout="horizontal"
                        :data-source="data"
                        size="small"
                    >
                        <template #renderItem="{ item }" :loading="loading">
                            <a-list-item style="padding-left: 0">
                                <a-list-item-meta>
                                    <template #description>
                                        <div
                                            style="
                                                display: flex;
                                                justify-content: space-between;
                                            "
                                        >
                                            <a>
                                                <span
                                                    v-if="item.number <= 3"
                                                    class="rankingItemNumber active"
                                                    >{{ item.number }}
                                                </span>
                                                <span
                                                    v-if="item.number > 3"
                                                    class="rankingItemNumber"
                                                    >{{ item.number }}
                                                </span>
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    :href="
                                                        '/#/clients/' + item.id
                                                    "
                                                >
                                                    {{ item.name }}
                                                </a>
                                            </a>
                                            <span
                                                >{{ item.helicesActives }}
                                                Hélices ativas
                                            </span>
                                        </div>
                                    </template>
                                </a-list-item-meta>
                            </a-list-item>
                        </template>
                    </a-list>
                </a-card>
            </a-col>
            <a-col :span="12">
                <a-card
                    :bordered="false"
                    :loading="loading"
                    style="min-height: 290px"
                >
                    <p style="font-size: 1.1rem; color: #3c3535">
                        Cidades/Estados mais ativos
                    </p>

                    <a-list
                        item-layout="horizontal"
                        :data-source="addressData"
                        size="small"
                    >
                        <template #renderItem="{ item }">
                            <a-list-item style="padding-left: 0">
                                <a-list-item-meta>
                                    <template #description>
                                        <div
                                            style="
                                                display: flex;
                                                justify-content: space-between;
                                            "
                                        >
                                            <a>
                                                <span
                                                    v-if="item.number <= 3"
                                                    class="rankingItemNumber active"
                                                    >{{ item.number }}
                                                </span>
                                                <span
                                                    v-if="item.number > 3"
                                                    class="rankingItemNumber"
                                                    >{{ item.number }}
                                                </span>
                                                <a>
                                                    {{ item.city }}/{{
                                                        item.state
                                                    }}
                                                </a>
                                            </a>
                                            <span
                                                >{{ item.helicesActives }}
                                                Hélices ativas
                                            </span>
                                        </div>
                                    </template>
                                </a-list-item-meta>
                            </a-list-item>
                        </template>
                    </a-list>
                </a-card>
            </a-col>
        </a-row>
        <a-row :gutter="16" style="margin-bottom: 1rem">
            <a-col :span="6">
                <!-- <a-card
                    :bordered="false"
                    style="height: 200px"
                    :loading="loading"
                >
                    <p
                        style="
                            font-size: 1rem;
                            color: #3c3535;
                            text-align-last: center;
                        "
                    >
                        Clientes Ativados x Desativados
                    </p>
                    <p
                        style="
                            font-size: 1.8rem;
                            color: #3c3535;
                            text-align-last: center;
                            margin-top: 10px;
                        "
                    >
                        <a-progress type="dashboard" :percent="75">
                            285/38
                        </a-progress>
                    </p>
                </a-card> -->
            </a-col></a-row
        >
        <a-button style="margin-top: 16px" @click="handleClick"
            >Toggle loading</a-button
        >
    </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useNavigation } from '../../composables/useNavigation'
import {
    SyncOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons-vue'
import {
    OrderStatus,
    getTagForOrderStatus,
} from '../../types/order/orderStatus'

interface ClientesData {
    number: number
    id: string
    name: string
    cnpj: string
    helicesActives: number
}

interface AddressData {
    number: number
    state: string
    city: string
    helicesActives: number
}

export default defineComponent({
    name: 'AdminDashboard',
    components: {
        SyncOutlined,
        CheckCircleOutlined,
        CloseCircleOutlined,
        ExclamationCircleOutlined,
    },
    setup(props) {
        const store = useStore()
        const { goBack } = useNavigation()

        const user = computed(() => store.state.user)

        const loading = ref(true)

        const handleClick = () => {
            loading.value = !loading.value
        }

        const data: ClientesData[] = [
            {
                number: 1,
                name: 'Empresa teste 1',
                id: '634c7ad5-f6f5-4147-a88d-9940e30975a0',
                cnpj: '21.440.700/0001-77',
                helicesActives: 60,
            },
            {
                number: 2,
                name: 'Empresa teste 2',
                id: '634c7ad5-f6f5-4147-a88d-9940e30975a0',
                cnpj: '21.440.700/0001-77',
                helicesActives: 58,
            },
            {
                number: 3,
                name: 'Empresa teste 3',
                id: '634c7ad5-f6f5-4147-a88d-9940e30975a0',
                cnpj: '21.440.700/0001-77',
                helicesActives: 49,
            },
            {
                number: 4,
                name: 'Empresa teste 4',
                id: '634c7ad5-f6f5-4147-a88d-9940e30975a0',
                cnpj: '21.440.700/0001-77',
                helicesActives: 45,
            },
            {
                number: 5,
                name: 'Empresa teste 5',
                id: '634c7ad5-f6f5-4147-a88d-9940e30975a0',
                cnpj: '21.440.700/0001-77',
                helicesActives: 40,
            },
        ]

        const addressData: AddressData[] = [
            {
                number: 1,
                state: 'SP',
                city: 'São Paulo',
                helicesActives: 60,
            },
            {
                number: 2,
                state: 'SP',
                city: 'São Bernardo de Campo',
                helicesActives: 60,
            },
            {
                number: 3,
                state: 'SP',
                city: 'Santo André',
                helicesActives: 60,
            },
            {
                number: 4,
                state: 'SP',
                city: 'São Caetano',
                helicesActives: 60,
            },
            {
                number: 5,
                state: 'RJ',
                city: 'Rio de Janeiro',
                helicesActives: 60,
            },
        ]

        return {
            user,
            goBack,
            loading,
            handleClick,
            getTagForOrderStatus,
            OrderStatus,
            data,
            addressData,
        }
    },
})
</script>

<style>
a-card component,
a-card p {
    margin: 0 auto;
    display: block;
    text-align: center;
    font-weight: bold;
}

li.ant-list-item .rankingItemNumber.active {
    color: #fff;
    background-color: #314659;
}

li.ant-list-item .rankingItemNumber {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-top: 1.5px;
    margin-right: 16px;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    background-color: #fafafa;
    border-radius: 20px;
}

li.ant-list-item span {
    color: rgb(111 106 106 / 85%);
    font-size: 14px;
    line-height: 22px;
}
</style>
