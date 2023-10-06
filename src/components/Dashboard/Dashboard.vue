<template>

    <a-page-header
        class="pageHeader"
        title="Bem vindo ao Ollix!"
        sub-title="Lorem ipsum dolor sit amet"
        @back="() => null"
    />

    <a-layout-content :style="{ margin: '10px 16px 25px' }">     
        <div :style="{ padding: '20px', background: '#fff' }" class="content">   

            <Hello />
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
  name: 'Dashboard',
  components: {Hello, Pokemons}
});
</script>

<style scoped>

.content {
    border-radius: 12px;
}




</style>