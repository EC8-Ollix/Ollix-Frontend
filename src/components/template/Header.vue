
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';

import { LeftOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: "Header",
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    }
  }

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
            <h2 class="title">
                Teste
            </h2>
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

    .toggle{
        
    }

    .title{
        color: #fff;
        margin-bottom: unset;
    }


</style>