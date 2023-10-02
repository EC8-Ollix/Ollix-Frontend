<template>

    <!-- <a-page-header
        class="pageHeader"
        title="Bem vindo ao Ollix!"
        sub-title= "Lorem ipsum dolor sit amet"
        @back="() => null"
    /> -->

    <a-layout-content :style="{ margin: '24px 16px 0' }">
        
        <div :style="{ padding: '20px', background: '#fff' }" class="content">
            <h2>
                Bem vindo ao Ollix!
            </h2>
            <Hello message="Teste o contador"/>
            <a-divider />
            <h3>
                Pokemons
            </h3>
            <Pokemons />
        </div>
      </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Hello from '../HelloWorld.vue';
import Pokemons from '../Pokemon.vue';

export default defineComponent({
  name: 'Content',
  components: {Hello, Pokemons}
});

</script>

<style scoped>
    .pageHeader {
        border: 1px solid rgb(235, 237, 240);
        margin: 10px 16px 0px;
        background: #fff;
        border-radius: 12px 12px 12px 12px;
    }

    .content {
        border-radius: 12px;
    }
</style>
