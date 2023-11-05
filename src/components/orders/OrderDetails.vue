<template>
    <a-modal
        v-model:open="visible"
        title="Realize seu Pedido de Hélices!"
        width="900px"
        @cancel="closeModal"
        @ok="handleOk"
    >
        <h3>
            {{ orderData?.id }}
        </h3>

        <div>
            <HelicesByAddress
                :clientId="orderData?.clientId"
                :addressId="orderData?.addressId"
                :viaClientScreen="true"
            />
        </div>

        <template #footer>
            <a-button style="margin-left: 10px" @click="closeModal"
                >Fechar</a-button
            >
            <a-button type="primary" @click="closeModal" :loading="false"
                >Confirmar Pedido</a-button
            >
        </template>
    </a-modal>
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
    OrderData,
} from '../../types/types'
import { ErrorModel, notifyError } from '../../config/notification'
import { formatStringDateToBR } from '../../composables/dateHelper'
import { useRoute } from 'vue-router'

import HelicesByAddress from '../helices/HelicesByAddress.vue'

export default defineComponent({
    name: 'OrderDetails',
    components: {
        SmileOutlined,
        FileSearchOutlined,
        HelicesByAddress,
    },
    props: {
        clientId: {
            type: String as PropType<string>,
        },
        orderId: {
            type: String as PropType<string>,
        },
        visible: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
    },
    setup(props, { emit }) {
        const { clientId, orderId, visible } = toRefs(props)

        const orderData = ref<OrderData>()

        const fetchData = async () => {
            if (!clientId.value || !orderId.value) {
                return
            }

            try {
                const response = await api.get<OrderData>(
                    `/orders/${orderId.value}`
                )
                orderData.value = response.data
            } catch (error: any) {
                let erroModel: ErrorModel = error?.response?.data
                notifyError(erroModel)
            }
        }

        onMounted(fetchData)

        watch(orderId, fetchData, { deep: true })

        const closeModal = (e: MouseEvent) => {
            console.log(e)
            visible.value = false
        }
        const handleOk = (e: MouseEvent) => {
            console.log(e)
            visible.value = false
        }

        return {
            visible,
            orderData,
            formatStringDateToBR,
            closeModal,
            handleOk
        }
    },
})
</script>

<style scoped>
.content {
    border-radius: 12px;
}
</style>
