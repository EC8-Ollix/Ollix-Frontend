<script lang="ts">
import {
    AreaChartOutlined,
    ControlOutlined,
    DatabaseOutlined,
    TeamOutlined,
    AuditOutlined,
    ContactsOutlined,
    ProfileOutlined,
} from '@ant-design/icons-vue'
import { defineComponent, ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { User } from 'src/types/types'

export default defineComponent({
    name: 'Sidebar',
    setup(props) {
        const store = useStore()
        const isLoggedIn = computed(() => store.state.isLoggedIn)

        const user = computed((): User => store.getters.user)
        const isAdmin = computed(() => store.getters.isAdmin)

        const route = useRoute()
        const selectedKeys = ref<string[]>([getKeyFromRoute(route.path)])

        const onCollapse = (collapsed: boolean, type: string) => {}
        const onBreakpoint = (broken: boolean) => {}

        watch(
            () => route.path,
            (newPath) => {
                selectedKeys.value = [getKeyFromRoute(newPath)]
            }
        )

        return {
            selectedKeys,
            onCollapse,
            onBreakpoint,
            isLoggedIn,
            isAdmin,
            user,
        }
    },
    components: {
        AreaChartOutlined,
        ControlOutlined,
        DatabaseOutlined,
        TeamOutlined,
        AuditOutlined,
        ContactsOutlined,
        ProfileOutlined,
    },
})

function getKeyFromRoute(path: string): string {
    if (path.includes('/admin')) {
        return '7'
    }
    if (path.includes('/orders')) {
        return '6'
    }
    if (path.includes('/users')) {
        return '5'
    }
    if (path.includes('/logs')) {
        return '4'
    }
    if (path.includes('/helices')) {
        return '3'
    }
    if (path.includes('/clients')) {
        return '2'
    }
    if (path === '/') {
        return '1'
    }
    return '1'
}
</script>

<template>
    <a-layout-sider
        breakpoint="lg"
        collapsed-width="0px"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
        class="sidebar"
        v-if="isLoggedIn"
    >
        <a-menu
            v-model:selectedKeys="selectedKeys"
            mode="inline"
            :style="{ borderRight: 0 }"
        >
            <a-menu-item key="1" v-if="!isAdmin">
                <AreaChartOutlined />
                <span class="nav-text">
                    <router-link to="/"> Dashboard </router-link>
                </span>
            </a-menu-item>
            <a-menu-item key="7" v-if="isAdmin">
                <AreaChartOutlined />
                <span class="nav-text">
                    <router-link to="/admin"> Dashboard </router-link>
                </span>
            </a-menu-item>
            <a-menu-item key="6" v-if="isAdmin">
                <ProfileOutlined />
                <span class="nav-text">
                    <router-link to="/orders/"> Pedidos </router-link>
                </span>
            </a-menu-item>
            <a-menu-item key="2" v-if="isAdmin">
                <ContactsOutlined />
                <span class="nav-text">
                    <router-link to="/clients"> Clientes </router-link>
                </span>
            </a-menu-item>
            <a-menu-item key="3" v-if="!isAdmin">
                <ControlOutlined />
                <span class="nav-text">
                    <router-link :to="`/helices/${user.clientApp?.id}`">
                        Hélices
                    </router-link>
                </span>
            </a-menu-item>
            <a-menu-item key="4">
                <AuditOutlined />
                <span class="nav-text">
                    <router-link to="/logs"> Logs </router-link>
                </span>
            </a-menu-item>
            <a-menu-item key="5">
                <TeamOutlined />
                <span class="nav-text">
                    <router-link :to="`/users/${user.clientApp?.id}`">
                        Usuários
                    </router-link>
                </span>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>

<style scoped>
.sidebar {
    background-color: #fff;
}
</style>
