<script lang="ts">
import { PropType, defineComponent, computed, ref,reactive } from 'vue'
import {
    QuestionCircleOutlined,
    ExportOutlined,
    UserOutlined,
    CloseOutlined,
    EditOutlined, 
    EllipsisOutlined,
    KeyOutlined
} from '@ant-design/icons-vue'
import { Avatar, Dropdown, Menu, Tooltip } from 'ant-design-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { SetUserLogout, UpdateUser } from '../../config/store'
import { User, UserRegisterRequest } from '../../types/types'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { Rule } from 'ant-design-vue/es/form'

import { api } from '../../api/api'

import { ErrorModel, notifyError, notifySuccess } from '../../config/notification'

interface UserUpdateState {
    firstName: string,
    lastName: string
}

interface UserUpdatePasswordState {
    currentPassword: string,
    newPassword: string
    newPasswordConfirmation: string
}

export default defineComponent({
    name: 'Header',
    components: {
        Avatar,
        Dropdown,
        Menu,
        Tooltip,
        QuestionCircleOutlined,
        ExportOutlined,
        UserOutlined,
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        CloseOutlined,
        EditOutlined, 
        EllipsisOutlined,
        KeyOutlined
    },
    setup(props) {
        const store = useStore()
        const router = useRouter()

        const toggleSidebar = () => {
            store.dispatch('toggleSidebar')
        }
        const isCollapsed = computed(() => store.getters.isSidebarCollapsed)

        const user = computed((): User => store.state.user)
        const isLoggedIn = computed(() => store.state.isLoggedIn)

        const logout = () => {
            SetUserLogout()
            router.push('/auth')
        }

        const userProfileVisible = ref<boolean>(false)

        const showEditModal = ref<boolean>(false)
        const showPasswordModal = ref<boolean>(false)

        const userFormRef = ref()

        const userState: UserUpdateState = reactive({
            firstName: user.value?.firstName || '',
            lastName: user.value?.lastName || '',
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
            // userEmail: [
            //     {
            //         required: true,
            //         message: 'O Email é obrigatório',
            //         trigger: 'blur',
            //     },
            //     {
            //         type: 'email',
            //         message: 'O Email está inválido',
            //         trigger: 'blur',
            //     },
            // ],
            // password: [
            //     {
            //         required: true,
            //         validator: validatePassword,
            //         trigger: 'blur',
            //     },
            //     {
            //         min: 6,
            //         message: 'A senha deve ter pelo menos 6 caracteres',
            //         trigger: 'blur',
            //     },
            // ],
            // confirmPassword: [
            //     {
            //         required: true,
            //         validator: validateConfirmPassword,
            //         trigger: 'blur',
            //     },
            // ],    
        }

        const confirmLoading = ref<boolean>(false)
        const updateUserProfile = async () => {
            await userFormRef
                .value!.validate()
                .then(async () => {
                    confirmLoading.value = true
                    try {
                        await api.put(`/users/${user.value.id}`, userState)
                        
                        user.value.firstName = userState.firstName
                        user.value.lastName = userState.lastName

                        UpdateUser(user.value);
                        notifySuccess({
                            successTitle: 'Perfil Editado com Sucesso!',
                        })

                        confirmLoading.value = false
                        showEditModal.value = false     

                    } catch (error: any) {
                        confirmLoading.value = false
                        let erroModel: ErrorModel = error?.response?.data
                        notifyError(erroModel)
                    }
                })
                .catch(() => {})
        }

        const updateUserPassword = async () => {
            await changePasswordFormRef
            .value!.validate()
            .then(async () => {
                confirmLoading.value = true
                try {
                    await api.put(`/users/changepassword/${user.value.id}`, changePasswordState)
                    
                    notifySuccess({
                        successTitle: 'Senha alterada com Sucesso!',
                    })

                    confirmLoading.value = false
                    showPasswordModal.value = false

                } catch (error: any) {
                    confirmLoading.value = false
                    let erroModel: ErrorModel = error?.response?.data
                    notifyError(erroModel)
                }
            })
            .catch(() => {})
        }
        

        const changePasswordFormRef = ref()

        const changePasswordState = reactive({
            currentPassword: undefined,
            newPassword: undefined,
            confirmPassword: undefined
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
            } else if (value !== changePasswordState.newPassword) {
                return Promise.reject('As senhas não coincidem.')
            } else {
                return Promise.resolve()
            }
        }

        const changePasswordRules: Record<string, Rule[]> = {
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

        return {
            user,
            isLoggedIn,
            logout,
            toggleSidebar,
            isCollapsed,
            userProfileVisible,
            showEditModal,
            updateUserProfile,
            updateUserPassword,
            showPasswordModal,
            userRules,
            userState,
            userFormRef,
            confirmLoading,
            changePasswordRules,
            changePasswordState,
            changePasswordFormRef

        }
    },
})
</script>

<template>
    <a-layout-header
        style="
            height: 50px;
            padding-left: 5px;
            display: inline-flex;
            background-color: #142d3f;
        "
        v-if="isLoggedIn"
    >
        <a
            @click="toggleSidebar"
            style="
                font-size: 1rem;
                color: #fff;
                margin-inline: 1.1rem;
                align-self: center;
            "
        >
            <MenuFoldOutlined v-if="!isCollapsed" />
            <MenuUnfoldOutlined v-if="isCollapsed" />
        </a>
        <div class="header">
            <div class="main-header">
                <a href="/">
                    <div class="logo" v-if="!isCollapsed" />
                </a>
            </div>

            <h3 class="title">
                {{ user?.clientApp?.bussinessName }}
            </h3>

            <div class="toolbar">
                <a-tooltip title="">
                    <question-circle-outlined
                        style="color: #fff; margin-right: 12px"
                    />
                </a-tooltip>

                <a-dropdown trigger="hover" placement="bottomRight">
                    <a class="ant-dropdown-link" @click.prevent>
                        <a-avatar
                            style="
                                background-color: #f56a00;
                                vertical-align: middle;
                                margin-inline: 8px;
                            "
                            :title="user?.firstName"
                        >
                            {{ (user?.firstName || '')[0] }}
                        </a-avatar>
                    </a>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="1" title="Meu Perfil">

                                <a @click="userProfileVisible = true">
                                    <span style="margin-right: 5px">
                                        <UserOutlined />
                                    </span>
                                    Meu Perfil
                                </a>
                            </a-menu-item>
                            <a-menu-item key="2" @click="logout" title="Sair">
                                <span style="margin-right: 5px">
                                    <ExportOutlined />
                                </span>
                                Sair
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </div>
    </a-layout-header>

<transition name="profile-card-transition">
    <div class="backgroundUserProfile" v-if="userProfileVisible">
        <div class="userProfileContent">


                <a-card hoverable v-if="userProfileVisible">
                    <template #actions>
                        <edit-outlined key="edit" title="Editar Perfil" @click="showEditModal = true"/>
                        <KeyOutlined key="edit" title="Alterar sua Senha" @click="showPasswordModal = true"/>
                    </template>
                    <a-card-meta>
                    <template #title>
                        <div style="display: flex; justify-content: space-between;">
                            <div class="meu-perfil">
                                Meu Perfil
                            </div>
                                <a-button type="text" size="small" @click="userProfileVisible = false" >
                                    <CloseOutlined :style="{fontSize: '14px', color: '#625e5e'}"/>
                                </a-button>
                        </div>

                    </template>
                        <template #description>
                            <p>
                            <hr style="border-top-style: none; margin-bottom: 1rem;"/>
                            </p>
                            <h4>Suas Informações</h4>
                            <p>Nome: {{ user.firstName }} {{ user.lastName }}</p>
                            <p>Email: {{ user.userEmail }}</p>
                            <br>
                            <h4>Cliente</h4>
                            <p>Razão Social: {{ user.clientApp?.companyName }}</p>
                            <p>Nome Fantasia: {{ user.clientApp?.bussinessName }}</p>
                            <p>CNPJ: {{ user.clientApp?.cnpj?.value }}</p>
                        </template>
                        <template #avatar>
                            <a-avatar
                                style="
                                    background-color: #f56a00;
                                    vertical-align: middle;
                                    margin-inline: 8px;
                                "
                                :title="user?.firstName"
                            >
                            {{ (user?.firstName || '')[0] }}
                            </a-avatar>
                        </template>
                    </a-card-meta>
                </a-card>
        </div>
    </div>
</transition>



    <a-modal
        v-model:open="showEditModal"
        title="Edite seu Perfil"
        width="480px"
    >

                <a-form
                ref="userFormRef"
                :model="userState"
                :rules="userRules"
                layout="vertical"
                >
                    <h3 class="title">Registre-se na Plataforma!</h3>
                    <a-form-item label="Primeiro Nome" name="firstName"                           >
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
                </a-form>
        <template #footer>
            <div style="margin-top: 3rem;">
                <a-button @click="showEditModal = false">Cancelar</a-button>
                <a-button type="primary" @click="updateUserProfile" :loading="confirmLoading"
                    >Salvar</a-button
                >
            </div>
           
        </template>
    </a-modal>

    <a-modal
        v-model:open="showPasswordModal"
        title="Altere sua Senha"
        width="480px"
    >

                <a-form
                ref="changePasswordFormRef"
                :model="changePasswordState"
                :rules="changePasswordRules"
                layout="vertical"
                >
                    <a-form-item label="Senha Atual" name="currentPassword">
                        <a-input
                            v-model:value="changePasswordState.currentPassword"
                            placeholder="Senha Atual"

                        >
                            <template #prefix>
                                <UserOutlined
                                    style="color: rgba(0, 0, 0, 0.25)"
                                />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item label="Nova Senha" name="newPassword">
                        <a-input
                            v-model:value="changePasswordState.newPassword"
                            placeholder="Nova Senha"
                        >
                            <template #prefix>
                                <UserOutlined
                                    style="color: rgba(0, 0, 0, 0.25)"
                                />
                            </template>
                        </a-input>
                    </a-form-item>
                                        <a-form-item label="Confime a Nova Senha" name="confirmPassword">
                        <a-input
                            v-model:value="changePasswordState.confirmPassword"
                            placeholder="Confime a Nova Senha"
                        >
                            <template #prefix>
                                <UserOutlined
                                    style="color: rgba(0, 0, 0, 0.25)"
                                />
                            </template>
                        </a-input>
                    </a-form-item>
                </a-form>
        <template #footer>
            <div style="margin-top: 3rem;">
                <a-button @click="showPasswordModal = false">Cancelar</a-button>
                <a-button type="primary" @click="updateUserPassword" :loading="confirmLoading"
                    >Salvar</a-button
                >
            </div>
           
        </template>
    </a-modal>
</template>

<style scoped>
.header {
    background-color: #142d3f;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    width: 100%;
}

.main-header {
    display: inline-flex;
}

.logo {
    width: 90px;
    height: 30px;
    margin: 16px 24px 16px 0;
    background: url('/logo-name-white.svg');
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
}

.title {
    color: #fff;
    margin-bottom: unset;
}

.toolbar {
    display: flex;
    align-items: center;
}

.user-name {
    color: #000;
    padding-top: 2px;
}

.userProfileContent {
    width: 880px;
    width: 880px;
    z-index: 20;
}

.backgroundUserProfile {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 19;
    background: #0000006e;
    display: flex;
    align-items: flex-start;
    place-content: center;
    padding-top: 20vh;
}

.userProfileContent .ant-card-meta-title {
    color: #6a6868;
}

.userProfileContent  h4, .meu-perfil {
    color: #625e5e;
}

.userProfileContent  p {
    color: #686464;
    margin-bottom: 0.6rem;
}

.profile-card-transition-enter-from,
.profile-card-transition-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.profile-card-transition-enter-to,
.profile-card-transition-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.profile-card-transition-enter-active,
.profile-card-transition-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.userProfileContent .ant-card-bordered.ant-card-hoverable:hover {
    cursor: initial;
}


</style>
