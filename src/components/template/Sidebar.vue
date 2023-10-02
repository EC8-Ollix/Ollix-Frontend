
<script lang="ts">

import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue';

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
  }
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
          <user-outlined />
          <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span class="nav-text">nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span class="nav-text">nav 3</span>
        </a-menu-item>
        <a-menu-item key="4">
          <user-outlined />
          <span class="nav-text">nav 4</span>
        </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>
        

<style scoped>

.sidebar {
    background-color: #fff;
}

</style>