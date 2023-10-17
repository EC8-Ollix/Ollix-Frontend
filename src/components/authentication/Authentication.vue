<script lang="ts">
import { reactive, ref, defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
    UserOutlined,
    LockOutlined,
    ArrowLeftOutlined,
} from '@ant-design/icons-vue'
import { Rule } from 'ant-design-vue/es/form'
import { api } from '../../api/api'
import {
    notifyError,
    notifySuccess,
    ErrorModel,
} from '../../config/notificationHelper'
import {
    UserloginResponse,
    ClientRegisterRequest,
    UserLoginRequest,
    UserRegisterRequest,
} from '../../types/types'

import { SetUserLoggedIn } from '../../config/store'

export default defineComponent({
    name: 'Authentication',
    setup() {
        const isLogin = ref<Boolean>(true)
        const tooggleLoginRegister = () => {
            isLogin.value = !isLogin.value
        }

        const userLoginFormRef = ref()

        const userLoginState: UserLoginRequest = reactive({
            userEmail: '',
            password: '',
        })

        const validatePassword = (rule: Rule, value: string) => {
            if (value === '') {
                return Promise.reject('Por favor, insira a senha.')
            } else {
                return Promise.resolve()
            }
        }

        const validateConfirmPassword = (rule: Rule, value: string) => {
            if (value === '') {
                return Promise.reject('Por favor, confirme a senha.')
            } else if (value !== userState.password) {
                return Promise.reject('As senhas não coincidem.')
            } else {
                return Promise.resolve()
            }
        }

        const userLoginRules: Record<string, Rule[]> = {
            userEmail: [
                {
                    required: true,
                    message: 'O Email é obrigatório',
                    trigger: 'blur',
                },
                {
                    type: 'email',
                    message: 'O Email está inválido',
                    trigger: 'blur',
                },
            ],
            password: [
                {
                    required: true,
                    validator: validatePassword,
                    trigger: 'blur',
                },
                {
                    min: 6,
                    message: 'A senha deve ter pelo menos 6 caracteres',
                    trigger: 'blur',
                },
            ],
        }

        const handleUserLogin = async () => {
            try {
                loading.value = true
                const payload = {
                    userEmail: userLoginState.userEmail,
                    userPassword: userLoginState.password,
                }

                const response = await api.post('auth/login', payload)

                const loginResponse: UserloginResponse = response.data
                loading.value = false

                SetUserLoggedIn(loginResponse)

                await router.push('/')
            } catch (error: any) {
                let erroModel: ErrorModel = error.response.data
                loading.value = false
                notifyError(erroModel)
            }
        }

        const handleUserLoginFailed = (errors: any) => {}

        const currentStep = ref(1)
        const router = useRouter()

        const goBack = () => {
            currentStep.value = 1
        }

        const userFormRef = ref()

        const userState: UserRegisterRequest = reactive({
            firstName: '',
            lastName: '',
            userEmail: '',
            password: '',
            confirmPassword: '',
        })

        const userRules: Record<string, Rule[]> = {
            firstName: [
                {
                    required: true,
                    message: 'O Nome é obrigatório',
                    trigger: 'blur',
                },
                {
                    max: 100,
                    message: 'O Nome deve ter no máximo 100 caracteres',
                    trigger: 'blur',
                },
            ],
            lastName: [
                {
                    required: true,
                    message: 'O Sobrenome é obrigatório',
                    trigger: 'blur',
                },
                {
                    max: 200,
                    message: 'O Sobrenome deve ter no máximo 200 caracteres',
                    trigger: 'blur',
                },
            ],
            userEmail: [
                {
                    required: true,
                    message: 'O Email é obrigatório',
                    trigger: 'blur',
                },
                {
                    type: 'email',
                    message: 'O Email está inválido',
                    trigger: 'blur',
                },
            ],
            password: [
                {
                    required: true,
                    validator: validatePassword,
                    trigger: 'blur',
                },
                {
                    min: 6,
                    message: 'A senha deve ter pelo menos 6 caracteres',
                    trigger: 'blur',
                },
            ],
            confirmPassword: [
                {
                    required: true,
                    validator: validateConfirmPassword,
                    trigger: 'blur',
                },
            ],
        }

        const handleUserRegistration = async (values: UserRegisterRequest) => {
            currentStep.value = 2
        }

        const handleUserRegistrationFailed = (errors: any) => {}

        const clientFormRef = ref()

        const clientState: ClientRegisterRequest = reactive({
            companyName: '',
            bussinessName: '',
            cnpj: '',
        })

        const formatValue = computed(() => {
            return formatCNPJ(clientState.cnpj)
        })

        const formatCNPJ = (value: string) => {
            const valueOnlyNumbers = value.replace(/[^\d]/g, '')
            let formattedCNPJ = valueOnlyNumbers

            if (valueOnlyNumbers.length > 12) {
                formattedCNPJ = `${valueOnlyNumbers.slice(
                    0,
                    2
                )}.${valueOnlyNumbers.slice(2, 5)}.${valueOnlyNumbers.slice(
                    5,
                    8
                )}/${valueOnlyNumbers.slice(8, 12)}-${valueOnlyNumbers.slice(
                    12,
                    14
                )}`
            } else if (valueOnlyNumbers.length > 8) {
                formattedCNPJ = `${valueOnlyNumbers.slice(
                    0,
                    2
                )}.${valueOnlyNumbers.slice(2, 5)}.${valueOnlyNumbers.slice(
                    5,
                    8
                )}/${valueOnlyNumbers.slice(8)}`
            } else if (valueOnlyNumbers.length > 5) {
                formattedCNPJ = `${valueOnlyNumbers.slice(
                    0,
                    2
                )}.${valueOnlyNumbers.slice(2, 5)}.${valueOnlyNumbers.slice(5)}`
            } else if (valueOnlyNumbers.length > 2) {
                formattedCNPJ = `${valueOnlyNumbers.slice(
                    0,
                    2
                )}.${valueOnlyNumbers.slice(2)}`
            }

            return formattedCNPJ
        }

        const onInput = (event: Event) => {
            const target = event.target as HTMLInputElement
            const value = target.value
            clientState.cnpj = formatCNPJ(value)
        }

        const clientRules: Record<string, Rule[]> = {
            companyName: [
                {
                    required: true,
                    message: 'A Razão Social é Obrigatória',
                    trigger: 'blur',
                },
                {
                    max: 400,
                    message: 'A Razão Social deve ter no máximo 400 caracteres',
                    trigger: 'blur',
                },
            ],
            bussinessName: [
                {
                    required: true,
                    message: 'O Nome Fantasia é obrigatório',
                    trigger: 'blur',
                },
                {
                    max: 400,
                    message: 'O Nome Fantasia deve ter no máximo 40 caracteres',
                    trigger: 'blur',
                },
            ],
            cnpj: [
                {
                    required: true,
                    message: 'O CNPJ é obrigatório',
                    trigger: 'blur',
                },
                {
                    max: 18,
                    message: 'O CNPJ deve ter 18 caracteres',
                    trigger: 'blur',
                },
                {
                    min: 18,
                    message: 'O CNPJ deve ter 18 caracteres',
                    trigger: 'blur',
                },
            ],
        }

        const loading = ref<boolean>(false)

        const handleClientRegistration = async () => {
            try {
                loading.value = true
                const payload = {
                    firstName: userState.firstName,
                    lastName: userState.lastName,
                    userEmail: userState.userEmail,
                    userPassword: userState.password,
                    companyName: clientState.companyName,
                    bussinessName: clientState.bussinessName,
                    cnpj: clientState.cnpj,
                }

                await api.post('auth/register', payload)

                loading.value = false
                notifySuccess({
                    successTitle: 'Conta Registrada com Sucesso!',
                    successMessage: 'Entre agora mesmo na plataforma',
                })

                tooggleLoginRegister()
            } catch (error: any) {
                let erroModel: ErrorModel = error.response.data

                loading.value = false
                notifyError(erroModel)

                if (erroModel.validationErrors) {
                    const identifiers = erroModel.validationErrors.map(
                        (err) => err.identifier
                    )
                    if (
                        identifiers.includes('UserEmail') ||
                        identifiers.includes('UserPassword') ||
                        identifiers.includes('FirstName') ||
                        identifiers.includes('LastName')
                    ) {
                        currentStep.value = 1
                    }
                }
            }
        }

        const handleClientRegistrationFailed = (errors: any) => {}

        return {
            isLogin,
            tooggleLoginRegister,
            currentStep,
            goBack,
            userFormRef,
            userState,
            userRules,
            handleUserRegistration,
            handleUserRegistrationFailed,
            clientState,
            clientRules,
            loading,
            handleClientRegistration,
            handleClientRegistrationFailed,
            onInput,
            userLoginFormRef,
            userLoginState,
            userLoginRules,
            handleUserLogin,
            handleUserLoginFailed,
        }
    },
    components: {
        UserOutlined,
        LockOutlined,
        ArrowLeftOutlined,
    },
})

const labelCol = { style: { width: '150px' } }
const wrapperCol = { span: 20 }
</script>

<template>
    <div class="register-container">
        <div class="background">
            <img src="/background-auth.jpg" class="background-image" />
        </div>
        <div class="register-form">
            <img src="/logo-ollix.svg" alt="Logo" class="logo" title="Oliix" />
            <p class="description">
                Energia eólica a partir do vento gerado pelos carros
            </p>

            <div v-if="isLogin">
                <a-form
                    ref="userLoginFormRef"
                    :model="userLoginState"
                    :rules="userLoginRules"
                    layout="vertical"
                    @finish="handleUserLogin"
                    @finishFailed="handleUserLoginFailed"
                    style="width: 22rem"
                >
                    <h3 class="title">Entre agora na Plataforma!</h3>

                    <a-form-item label="Email" name="userEmail">
                        <a-input
                            v-model:value="userLoginState.userEmail"
                            placeholder="Email"
                        >
                            <template #prefix>
                                <UserOutlined
                                    style="color: rgba(0, 0, 0, 0.25)"
                                />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item label="Senha" name="password">
                        <a-input-password
                            v-model:value="userLoginState.password"
                            placeholder="Senha"
                        >
                            <template #prefix>
                                <LockOutlined
                                    style="color: rgba(0, 0, 0, 0.25)"
                                />
                            </template>
                        </a-input-password>
                    </a-form-item>
                    <a-form-item>
                        <a-button
                            type="primary"
                            html-type="submit"
                            class="register-button"
                            :loading="loading"
                            >Entrar</a-button
                        >
                    </a-form-item>
                </a-form>

                <p style="text-align: center">
                    Não possui uma conta?
                    <a-button
                        @click="tooggleLoginRegister"
                        size="small"
                        type="link"
                    >
                        Registre-se Aqui</a-button
                    >
                </p>
            </div>

            <div v-if="!isLogin">
                <a-form
                    ref="userFormRef"
                    :model="userState"
                    :rules="userRules"
                    layout="vertical"
                    @finish="handleUserRegistration"
                    @finishFailed="handleUserRegistrationFailed"
                    style="width: 22rem"
                    v-if="currentStep === 1"
                >
                    <h3 class="title">Registre-se na Plataforma!</h3>
                    <a-form-item label="Primeiro Nome" name="firstName">
                        <a-input
                            v-model:value="userState.firstName"
                            placeholder="Nome"
                        >
                            <template #prefix>
                                <UserOutlined
                                    style="color: rgba(0, 0, 0, 0.25)"
                                />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item label="Último Nome" name="lastName">
                        <a-input
                            v-model:value="userState.lastName"
                            placeholder="Sobrenome"
                        >
                            <template #prefix>
                                <UserOutlined
                                    style="color: rgba(0, 0, 0, 0.25)"
                                />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item label="Email" name="userEmail">
                        <a-input
                            v-model:value="userState.userEmail"
                            placeholder="Email"
                        >
                            <template #prefix>
                                <UserOutlined
                                    style="color: rgba(0, 0, 0, 0.25)"
                                />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item label="Senha" name="password">
                        <a-input-password
                            v-model:value="userState.password"
                            placeholder="Senha"
                        >
                            <template #prefix>
                                <LockOutlined
                                    style="color: rgba(0, 0, 0, 0.25)"
                                />
                            </template>
                        </a-input-password>
                    </a-form-item>
                    <a-form-item
                        label="Confirme a Senha"
                        name="confirmPassword"
                    >
                        <a-input-password
                            v-model:value="userState.confirmPassword"
                            placeholder="Confirmação de Senha"
                        >
                            <template #prefix>
                                <LockOutlined
                                    style="color: rgba(0, 0, 0, 0.25)"
                                />
                            </template>
                        </a-input-password>
                    </a-form-item>
                    <a-form-item>
                        <a-button
                            type="primary"
                            html-type="submit"
                            class="register-button"
                            >Proximo Passo</a-button
                        >
                    </a-form-item>
                </a-form>

                <a-form
                    ref="clientFormRef"
                    :model="clientState"
                    :rules="clientRules"
                    layout="vertical"
                    @finish="handleClientRegistration"
                    @finishFailed="handleClientRegistrationFailed"
                    style="width: 22rem"
                    v-if="currentStep === 2"
                >
                    <h3 class="title">Agora Registre sua Empresa!</h3>

                    <a-button
                        style="margin-bottom: 15px"
                        v-if="currentStep === 2"
                        @click="goBack"
                        type="text"
                        shape="circle"
                    >
                        <template #icon>
                            <ArrowLeftOutlined />
                        </template>
                    </a-button>

                    <a-form-item label="Razão Social" name="companyName">
                        <a-input
                            v-model:value="clientState.companyName"
                            placeholder="Razão Social"
                        >
                        </a-input>
                    </a-form-item>
                    <a-form-item label="Nome Fantasia" name="bussinessName">
                        <a-input
                            v-model:value="clientState.bussinessName"
                            placeholder="Nome Fantasia"
                        >
                        </a-input>
                    </a-form-item>
                    <a-form-item label="CNPJ" name="cnpj">
                        <a-input
                            v-model:value="clientState.cnpj"
                            placeholder="CNPJ"
                            :max-length="18"
                            @input="onInput"
                        >
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-button
                            type="primary"
                            html-type="submit"
                            class="register-button"
                            :loading="loading"
                            >Confirmar</a-button
                        >
                    </a-form-item>
                </a-form>

                <p style="text-align: center">
                    Já possui uma conta?

                    <a-button
                        @click="tooggleLoginRegister"
                        size="small"
                        type="link"
                    >
                        Entre aqui</a-button
                    >
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.register-container {
    display: flex;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
}

.background {
    flex: 1;
    background-color: #e5f5fa;
    display: flex;
    align-items: center;
    justify-content: center;
}

.background-image {
    background: url('/background-auth.jpg');
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 100%;
}

.register-form {
    flex: 0.8;
    padding: 50px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
}

.logo {
    width: 120px;
    height: 60px;
    margin: 16px 24px 16px 0;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
}

.description {
    font-size: 14px;
    color: #888;
    text-align: center;
    margin-bottom: 20px;
}

.title {
    text-align-last: center;
    margin-bottom: 20px;
}
@media (min-width: 1500px) {
    .register-container {
        height: 100vh;
    }
}

@media (max-width: 1500px) {
    .register-container {
        height: 100vh;
    }
}

@media (max-width: 768px) {
    .register-container {
        flex-direction: column;
    }

    .background {
        display: none;
    }

    .register-form {
        /* height: 100%; */
        width: 100%;
        padding: 20px;
    }
}

.register-button {
    width: 100%;
    margin-top: 10px;
}
</style>
../../api/api
