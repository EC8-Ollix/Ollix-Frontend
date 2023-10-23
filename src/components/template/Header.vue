<script lang="ts">
import { PropType, defineComponent, computed } from 'vue'
import {
    QuestionCircleOutlined,
    ExportOutlined,
    UserOutlined,
} from '@ant-design/icons-vue'
import { Avatar, Dropdown, Menu, Tooltip } from 'ant-design-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { SetUserLogout } from '../../config/store'
import { User } from '../../types/types'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'

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

        return {
            user,
            isLoggedIn,
            logout,
            toggleSidebar,
            isCollapsed,
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
                            U
                        </a-avatar>
                    </a>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="1">
                                <span style="margin-right: 5px">
                                    <UserOutlined />
                                </span>
                                Meu Perfil
                            </a-menu-item>
                            <a-menu-item key="2" @click="logout">
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
</style>
