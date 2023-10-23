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
        const isCollapsed = computed(() => store.getters.isSidebarCollapsed)

        const isLoggedIn = computed(() => store.state.isLoggedIn)

        const user = computed((): User => store.getters.user)
        const isAdmin = computed(() => store.getters.isAdmin)

        const route = useRoute()
        const selectedKeys = ref<string[]>([getKeyFromRoute(route.path)])

        const onCollapse = (collapsed: boolean, type: string) => {}
        const onBreakpoint = (broken: boolean) => {}

        watch(
            () => route,
            (newRoute) => {
                const context = newRoute.query.fromClientDetails
                    ? 'fromClientDetails'
                    : undefined
                selectedKeys.value = [getKeyFromRoute(newRoute.path, context)]
            },
            { deep: true }
        )

        const siderStyle = computed(() => {
            return isCollapsed.value
                ? {}
                : {
                      flex: '0 0 200px',
                      maxWidth: '200px',
                      minWidth: '200px',
                      width: '200px',
                  }
        })

        return {
            selectedKeys,
            onCollapse,
            onBreakpoint,
            isLoggedIn,
            isAdmin,
            user,
            isCollapsed,
            siderStyle,
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

function getKeyFromRoute(path: string, context?: string): string {
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
        if (context === 'fromClientDetails') {
            return '2'
        }
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
    <aside
        :style="siderStyle"
        breakpoint="lg"
        collapsed-width="0px"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
        class="sidebar ant-layout-sider ant-layout-sider-dark"
        v-if="isLoggedIn"
    >
        <a-menu
            v-model:selectedKeys="selectedKeys"
            mode="inline"
            :style="{ borderRight: 0 }"
        >
            <a-menu-item key="1" v-if="!isAdmin">
                <span class="nav-text">
                    <router-link to="/" title="Dashboard">
                        <AreaChartOutlined />
                        <span v-if="!isCollapsed">Dashboard</span>
                    </router-link>
                </span>
            </a-menu-item>
            <a-menu-item key="7" v-if="isAdmin">
                <span class="nav-text">
                    <router-link to="/admin" title="Dashboard">
                        <AreaChartOutlined />
                        <span v-if="!isCollapsed">Dashboard</span>
                    </router-link>
                </span>
            </a-menu-item>
            <a-menu-item key="3" v-if="!isAdmin" title="Hélices">
                <span class="nav-text">
                    <router-link :to="`/helices/${user.clientApp?.id}`">
                        <ControlOutlined />
                        <span v-if="!isCollapsed">Hélices</span>
                    </router-link>
                </span>
            </a-menu-item>
            <a-menu-item key="6">
                <span class="nav-text">
                    <router-link to="/orders/" title="Pedidos">
                        <ProfileOutlined />
                        <span v-if="!isCollapsed">Pedidos</span>
                    </router-link>
                </span>
            </a-menu-item>
            <a-menu-item key="2" v-if="isAdmin">
                <span class="nav-text">
                    <router-link to="/clients" title="Clientes">
                        <ContactsOutlined />
                        <span v-if="!isCollapsed">Clientes</span>
                    </router-link>
                </span>
            </a-menu-item>

            <a-menu-item key="5">
                <span class="nav-text">
                    <router-link
                        :to="`/users/${user.clientApp?.id}`"
                        title="Usuários"
                    >
                        <TeamOutlined />
                        <span v-if="!isCollapsed">Usuários </span>
                    </router-link>
                </span>
            </a-menu-item>
            <a-menu-item key="4">
                <span class="nav-text">
                    <router-link
                        :to="`/logs/${user.clientApp?.id}`"
                        title="Logs"
                    >
                        <AuditOutlined />
                        <span v-if="!isCollapsed">Logs</span>
                    </router-link>
                </span>
            </a-menu-item>
        </a-menu>
    </aside>
</template>

<style scoped>
.sidebar {
    background-color: #fff;
    transition: all 0.3s ease 0s;
}

.ant-layout.ant-layout-has-sider {
    flex-direction: row;
}
</style>
