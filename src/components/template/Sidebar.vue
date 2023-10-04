
<script lang="ts">

import { AreaChartOutlined, ControlOutlined, DatabaseOutlined, UsergroupDeleteOutlined} from '@ant-design/icons-vue';

import { defineComponent, ref } from 'vue';


export default defineComponent({
  name: "Sidebar",
  setup(props) {
    const selectedKeys = ref<string[]>(['1']);

    const onCollapse = (collapsed: boolean, type: string) => {
    };

    const onBreakpoint = (broken: boolean) => {
    };

    return {
        selectedKeys,
        onCollapse,
        onBreakpoint
    };
  },
  components: {
    AreaChartOutlined,
    ControlOutlined,
    DatabaseOutlined,
    UsergroupDeleteOutlined
  },
});

</script>

<template > 
    <a-layout-sider 
        breakpoint="lg"
        collapsed-width="0px"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
        class="sidebar">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          :style="{ borderRight: 0 }"
        >
        <a-menu-item key="1">
          <AreaChartOutlined />
          <span class="nav-text">           Dashboard</span>
        </a-menu-item>
        <a-menu-item key="2">
          <ControlOutlined />
          <span class="nav-text">Hélices</span>
        </a-menu-item>
        <a-menu-item key="3">
          <DatabaseOutlined />
          <span class="nav-text">Logs</span>
        </a-menu-item>
        <a-menu-item key="4">
          <UsergroupDeleteOutlined />
          <span class="nav-text">Usuários</span>
        </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>
        

<style scoped>

.sidebar {
    background-color: #fff;
}

</style>