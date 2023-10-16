<script lang="ts">
import { PropType, defineComponent, computed } from 'vue'
import {
    QuestionCircleOutlined,
    ExportOutlined,
    UserOutlined,
} from '@ant-design/icons-vue'
import { Avatar, Dropdown, Menu, Tooltip } from 'ant-design-vue'
import { useStore } from 'vuex'

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
    },
    props: {
        title: {
            type: String as PropType<string>,
            required: true,
        },
    },
    setup(props) {
        const store = useStore()

        const user = computed(() => store.state.user)
        const isLoggedIn = computed(() => store.state.isLoggedIn)

        return {
            user,
            isLoggedIn,
        }
    },
})
</script>

<template>
    <a-layout-header class="header" style="height: 50px" v-if="isLoggedIn">
        <div class="main-header">
            <a href="/">
                <div class="logo" />
            </a>
        </div>

        <h3 class="title">
            {{ title }}
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
                        :title="user.name"
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
                        <a-menu-item key="2">
                            <span style="margin-right: 5px">
                                <ExportOutlined />
                            </span>
                            Sair
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </a-layout-header>
</template>

<style scoped>
.header {
    background-color: #142d3f;
    display: flex;
    align-items: center;
    justify-content: space-between;
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