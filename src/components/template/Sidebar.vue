<script lang="ts">
import {
    AreaChartOutlined,
    ControlOutlined,
    DatabaseOutlined,
    UsergroupDeleteOutlined,
} from '@ant-design/icons-vue'
import { defineComponent, ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
    name: 'Sidebar',
    setup(props) {
        const store = useStore()
        const isLoggedIn = computed(() => store.state.isLoggedIn)

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
        }
    },
    components: {
        AreaChartOutlined,
        ControlOutlined,
        DatabaseOutlined,
        UsergroupDeleteOutlined,
    },
})

function getKeyFromRoute(path: string): string {
    switch (path) {
        case '/Ollix-Frontend':
            return '1'
        case '/Ollix-Frontend/helices':
            return '2'
        case '/Ollix-Frontend/logs':
            return '3'
        case '/Ollix-Frontend/users':
            return '4'
        default:
            return '1'
    }
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
            <a-menu-item key="1">
                <AreaChartOutlined />
                <span class="nav-text">
                    <router-link to="/Ollix-Frontend/"> Dashboard </router-link>
                </span>
            </a-menu-item>
            <a-menu-item key="2">
                <ControlOutlined />
                <span class="nav-text">
                    <router-link to="/Ollix-Frontend/helices/">
                        Hélices
                    </router-link>
                </span>
            </a-menu-item>
            <a-menu-item key="3">
                <DatabaseOutlined />
                <span class="nav-text">
                    <router-link to="/Ollix-Frontend/logs/"> Logs </router-link>
                </span>
            </a-menu-item>
            <a-menu-item key="4">
                <UsergroupDeleteOutlined />
                <span class="nav-text">
                    <router-link to="/Ollix-Frontend/users/">
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
