<template>
    <div class="content-template" @mouseover="isHovered = true" @mouseleave="isHovered = false">
        <a-page-header
            class="pageHeader"
            title="Bem vindo ao Ollix!"
            sub-title="Lorem ipsum dolor sit amet"
            @back="() => null"
        />

        <a-layout-content :style="{ margin: '10px 16px 25px' }">     
            <div :style="{ padding: '20px', background: '#fff' }" class="content">
                <Hello/>
                <a-divider />
                <h3>
                    Pokemons
                </h3>
                <Pokemons />
            </div>
        </a-layout-content>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Hello from '../HelloWorld.vue';
import Pokemons from '../Pokemon.vue';

export default defineComponent({
  name: 'Content',
  components: {Hello, Pokemons},
  setup() {
    const isHovered = ref(false);

    return { isHovered };
  }
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

    .content-template {
        min-height: fit-content;
        overflow-y: scroll;
    }

    .content-template::-webkit-scrollbar {
        width: 10px;
    }

    .content-template::-webkit-scrollbar-thumb {
        background-color: transparent;
        border-radius: 6px;
    }

    .content-template::-webkit-scrollbar-thumb:hover {
        background-color: darkgrey;
    }

    .content-template::-webkit-scrollbar-track {
        background-color: transparent;
    }

</style>