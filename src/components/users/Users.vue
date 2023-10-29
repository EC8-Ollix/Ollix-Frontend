<template>
    <a-page-header
        class="pageHeader"
        title="Usuários"
        @back="goBack"
        v-if="!viaClientScreen"
    />

    <a-layout-content
        :style="!viaClientScreen ? { margin: '10px 16px 25px' } : {}"
    >
        <div
            :style="
                !viaClientScreen ? { padding: '20px', background: '#fff' } : {}
            "
            :class="{ content: !viaClientScreen }"
        >
            <!-- <div class="actions">
                <a-row style="place-content: start">
                    <a-col>
                        <a-button
                            type="default"
                            :icon="h(PlusOutlined)"
                            @click="visible = true"
                            >Novo Usuário</a-button
                        >
                    </a-col>
                </a-row>
            </div> -->

            <a-config-provider>
                <template #renderEmpty>
                    <div style="text-align: center; padding: 25px">
                        <smile-outlined style="font-size: 20px" />
                        <p>Nada encontrado</p>
                    </div>
                </template>
                <a-table
                    :columns="columns"
                    :data-source="data"
                    :pagination="false"
                    :loading="loading"
                    size="small"
                >
                </a-table>
            </a-config-provider>
            <a-pagination
                v-model:current="pagination.page"
                v-model:pageSize="pagination.pageSize"
                :page-size-options="pageSizeOptions"
                show-size-changer
                :total="totalRecords"
                @showSizeChange="onShowSizeChange"
                style="text-align: right; margin: 25px 0 15px 0"
            >
                <template #buildOptionText="props">
                    <span>{{ props.value }}/pág</span>
                </template>
            </a-pagination>
        </div>
    </a-layout-content>

    <a-layout-footer v-if="!viaClientScreen" class="footer">
        <a-row style="place-content: end">
            <a-col>
                <a-button
                    type="primary"
                    :icon="h(PlusOutlined)"
                    @click="visible = true"
                    >Novo Usuário</a-button
                >
            </a-col>
        </a-row></a-layout-footer
    >

    <a-modal v-model:open="visible" title="Crie um novo Usuário" width="480px">
        <a-form
            ref="formRef"
            :rules="userRules"
            :model="newUserState"
            layout="vertical"
            name="form_in_modal"
        >
            <a-form-item name="firstName" label="Nome">
                <a-input
                    v-model:value="newUserState.firstName"
                    placeholder="Nome"
                >
                    <template #prefix>
                        <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item name="lastName" label="Sobrenome">
                <a-input
                    v-model:value="newUserState.lastName"
                    placeholder="Sobrenome"
                >
                    <template #prefix>
                        <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item name="userEmail" label="Email">
                <a-input
                    v-model:value="newUserState.userEmail"
                    placeholder="Email"
                >
                    <template #prefix>
                        <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item name="userPassword" label="Senha">
                <a-input-password
                    v-model:value="newUserState.userPassword"
                    placeholder="Senha"
                >
                    <template #prefix>
                        <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-form-item name="confirmPassword" label="Confirme a Senha">
                <a-input-password
                    v-model:value="newUserState.confirmPassword"
                    placeholder="Confirme a Senha"
                >
                    <template #prefix>
                        <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                </a-input-password>
            </a-form-item>
        </a-form>
        <template #footer>
            <a-button style="margin-left: 10px" @click="resetForm"
                >Limpar</a-button
            >
            <a-button
                type="primary"
                @click="onNewUserConfirm"
                :loading="confirmLoading"
                >Criar Usuário</a-button
            >
        </template>
    </a-modal>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    watch,
    PropType,
    toRefs,
    computed,
    reactive,
    h,
} from 'vue'

import type { FormInstance } from 'ant-design-vue'
import { useNavigation } from '../../composables/useNavigation'
import { useStore } from 'vuex'
import {
    LockOutlined,
    SmileOutlined,
    CheckCircleOutlined,
    UserOutlined,
    PlusOutlined,
} from '@ant-design/icons-vue'

import { Rule } from 'ant-design-vue/es/form'

import { api } from '../../api/api'
import { PaginationRequest, PaginationResponse, User } from '../../types/types'
import { ErrorModel, notifyError } from '../../config/notification'
import { Modal, ModalFuncProps } from 'ant-design-vue'

interface NewUserState {
    firstName: string
    lastName: string
    userEmail: string
    userPassword: string
    confirmPassword: string
}

export default defineComponent({
    name: 'Users',
    components: {
        PlusOutlined,
        LockOutlined,
        UserOutlined,
        SmileOutlined,
        CheckCircleOutlined,
    },
    props: {
        clientId: {
            type: String as PropType<string>,
        },
        viaClientScreen: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
    },
    setup(props) {
        const { goBack } = useNavigation()
        const store = useStore()
        const isAdmin = computed(() => store.state.isAdmin)

        const { clientId, viaClientScreen } = toRefs(props)
        const totalRecords = ref(0)
        const columns = [
            {
                title: 'Nome',
                dataIndex: 'firstName',
                width: '33%',
            },
            {
                title: 'Sobrenome',
                dataIndex: 'lastName',
                width: '33%',
            },
            {
                title: 'Email',
                dataIndex: 'userEmail',
                width: '33%',
            },
        ]

        const pageSizeOptions = ref<string[]>(['5', '10', '20', '40', '50'])
        const data = ref<User[]>([])
        const loading = ref(false)
        const pagination = ref<PaginationRequest>({
            page: 1,
            pageSize: 10,
        })

        const fetchData = async (isBySearch: boolean) => {
            loading.value = true

            const params: any = {
                ...pagination.value,
            }

            if (isBySearch) {
                params.page = 1
            }

            if (clientId.value) {
                params.clientId = clientId.value || undefined
            }

            try {
                const response = await api.get<PaginationResponse<User>>(
                    '/users',
                    {
                        params: params,
                    }
                )

                data.value = response.data.data
                pagination.value.page = response.data.page
                pagination.value.pageSize = response.data.pageSize
                totalRecords.value = response.data.totalRecords
            } catch (error: any) {
                let erroModel: ErrorModel = error?.response?.data
                notifyError(erroModel)
            } finally {
                loading.value = false
            }
        }

        onMounted(() => fetchData(false))

        watch(pagination, () => fetchData(false), { deep: true })

        const onShowSizeChange = (current: number, pageSize: number) => {
            pagination.value.page = current
            pagination.value.pageSize = pageSize

            if (pageSize !== pagination?.value.pageSize) {
                data.value = []
            }
        }

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
            } else if (value !== newUserState.userPassword) {
                return Promise.reject('As senhas não coincidem.')
            } else {
                return Promise.resolve()
            }
        }

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
            userPassword: [
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

        const confirmLoading = ref<boolean>(false)
        const formRef = ref<FormInstance>()
        const visible = ref(false)
        const newUserState: NewUserState = reactive({
            firstName: '',
            lastName: '',
            userEmail: '',
            userPassword: '',
            confirmPassword: '',
        })

        const onNewUserConfirm = async () => {
            await formRef
                .value!.validate()
                .then(async () => {
                    confirmLoading.value = true
                    try {
                        const response = await api.post('/users', newUserState)
                        const newUserResponse: User = response.data
                        await fetchData(false)
                        confirmLoading.value = false

                        successOrderCreated(newUserResponse)
                    } catch (error: any) {
                        confirmLoading.value = false
                        let erroModel: ErrorModel = error?.response?.data
                        notifyError(erroModel)
                    }
                })
                .catch((error) => {})
        }

        const successOrderCreated = (user: User) => {
            Modal.confirm({
                title: `Usuário ${user.firstName} ${user.lastName} criado com Sucesso!`,
                icon: h(CheckCircleOutlined, { style: 'color:green;' }),
                content: h(
                    'div',
                    { style: 'padding-bottom:15px;' },
                    'Deseja criar um novo Usuário?'
                ),
                width: '490px',
                okText: 'Sim',
                okType: 'primary',
                cancelText: 'Não, obrigado',
                onOk() {
                    resetForm()
                },
                onCancel() {
                    visible.value = false
                    resetForm()
                },
            })
        }
        const resetForm = () => {
            formRef.value!.resetFields()
        }

        return {
            goBack,
            data,
            loading,
            pagination,
            columns,
            onShowSizeChange,
            pageSizeOptions,
            totalRecords,
            isAdmin,
            newUserState,
            visible,
            formRef,
            confirmLoading,
            resetForm,
            onNewUserConfirm,
            userRules,
            PlusOutlined,
            h,
        }
    },
})
</script>

<style scoped>
.content {
    border-radius: 12px;
}

.actions {
    text-align: end;
    margin-bottom: 1rem;
}
</style>
