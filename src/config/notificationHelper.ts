import { AnyFn } from '@vueuse/core'
import { notification } from 'ant-design-vue'

export interface SuccessModel {
    successTitle: string
    successMessage?: string
}

export interface ErrorModel {
    errors: string[]
    validationErrors: ValidationError[]
}

export interface ValidationError {
    identifier: string
    errorMessage: string
    errorCode: string
    severity: number
}

export function notifySuccess(success: SuccessModel) {
    notification['success']({
        message: success.successTitle,
        description: success.successMessage,
        duration: 8,
    })
}

export function notifyError(error: ErrorModel, errorTitle?: string) {
    let message = 'Um erro interno ocorreu!'

    var hasValidationErrors =
        error.validationErrors && error.validationErrors.length > 0
    var hasErrors = error.errors && error.errors.length > 0

    if (hasValidationErrors) {
        for (let i = 0; i < error.validationErrors.length; i++) {
            notification['error']({
                message: '',
                description: error.validationErrors[i].errorMessage,
                duration: 10,
            })
        }
    }

    if (hasErrors) {
        for (let i = 0; i < error.errors.length; i++) {
            notification['error']({
                message: '',
                description: error.errors[i],
                duration: 10,
            })
        }
    }

    if (!hasErrors && !hasValidationErrors) {
        notification['error']({
            message: errorTitle,
            description: message,
            duration: 10,
        })
    }
}
