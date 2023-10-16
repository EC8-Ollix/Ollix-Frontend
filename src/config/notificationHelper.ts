import { AnyFn } from '@vueuse/core'
import { notification } from 'ant-design-vue'

export interface Success {
    successTitle: string
    successMessage?: string
}

export function notifySuccess(success: Success) {
    notification['success']({
        message: success.successTitle,
        description: success.successMessage,
        duration: 8,
    })
}

export function notifyError(error: any, errorTitle?: string) {
    let message = 'Um erro desconhecido ocorreu'

    if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
    ) {
        if (
            error.response.data.validationErrors &&
            error.response.data.validationErrors.length > 0
        ) {
            message = error.response.data.validationErrors
                .map((err: any) => err.errorMessage)
                .join(', <br>')
        } else if (
            error.response.data.errors &&
            error.response.data.errors.length > 0
        ) {
            message = error.response.data.errors.join(', <br>')
        }
    } else if (error.response && error.response.status >= 500) {
        errorTitle = 'Um erro interno ocorreu'
    }

    notification['error']({
        message: errorTitle,
        description: message,
        duration: 10,
    })
}
