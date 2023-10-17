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
        case '/':
            return '1'
        case '/helices':
            return '2'
        case '/logs':
            return '3'
        case '/users':
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
                    <router-link to="/"> Dashboard </router-link>
                </span>
            </a-menu-item>
            <a-menu-item key="2">
                <ControlOutlined />
                <span class="nav-text">
                    <router-link to="/helices"> Hélices </router-link>
                </span>
            </a-menu-item>
            <a-menu-item key="3">
                <DatabaseOutlined />
                <span class="nav-text">
                    <router-link to="/logs"> Logs </router-link>
                </span>
            </a-menu-item>
            <a-menu-item key="4">
                <UsergroupDeleteOutlined />
                <span class="nav-text">
                    <router-link to="/users"> Usuários </router-link>
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
