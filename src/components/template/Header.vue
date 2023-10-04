<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { QuestionCircleOutlined, ExportOutlined, UserOutlined } from '@ant-design/icons-vue';
import { Avatar, Dropdown, Menu, Tooltip } from 'ant-design-vue';

export default defineComponent({
  name: "Header",
  components: {
    Avatar,
    Dropdown,
    Menu,
    Tooltip,
    QuestionCircleOutlined,
    ExportOutlined,
    UserOutlined
  },
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>

<template>
    <a-layout-header class="header">  
        <div class="main-header">
            <a  href="/">
                <div class="logo" />
            </a>
        </div>

        <h2 class="title">
            {{ title }}
        </h2>

        <div class="toolbar">
            <a-tooltip title="">
            <question-circle-outlined style="color: #fff; margin-right: 12px;"/>
            </a-tooltip>
            
            <a-dropdown trigger="hover" placement="bottomRight">
                <a class="ant-dropdown-link" @click.prevent>
                    <a-avatar size="large" style="background-color: #f56a00; vertical-align: middle; margin-inline: 8px;">
                        U
                    </a-avatar>
                </a>
                <template #overlay>
                    <a-menu>
                        <a-menu-item key="1">
                            <UserOutlined />
                            Meu Perfil
                        </a-menu-item>
                        <a-menu-item key="2">
                            <ExportOutlined />
                            Sair
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>

    </a-layout-header>  
</template>
        
<style scoped>
    .header{
        background-color: #142D3F;
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

    .title{
        color: #fff;
        margin-bottom: unset;
    }

    .toolbar {
        display: flex;
        align-items: center;
    }
</style>