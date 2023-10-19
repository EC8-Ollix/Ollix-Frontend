import {
    SyncOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons-vue'
import { Component } from 'vue'

export enum OrderStatus {
    Pending = 1,
    InstallationPending = 2,
    Completed = 3,
    Denied = 4,
    Cancel = 5,
}

type OrderStatusTag = {
    color: string
    icon: Component | null
    text: string
}

const orderStatusToTagMap: { [key in OrderStatus]: OrderStatusTag } = {
    [OrderStatus.Pending]: {
        color: 'default',
        icon: null,
        text: 'Pendente',
    },
    [OrderStatus.InstallationPending]: {
        color: 'processing',
        icon: SyncOutlined,
        text: 'Instalação Pendente',
    },
    [OrderStatus.Completed]: {
        color: 'success',
        icon: CheckCircleOutlined,
        text: 'Finalizado',
    },
    [OrderStatus.Denied]: {
        color: 'error',
        icon: CloseCircleOutlined,
        text: 'Negado',
    },
    [OrderStatus.Cancel]: {
        color: 'warning',
        icon: ExclamationCircleOutlined,
        text: 'Cancelado',
    },
}

export function getTagForOrderStatus(status: OrderStatus) {
    const tagData = orderStatusToTagMap[status]
    return tagData
}
