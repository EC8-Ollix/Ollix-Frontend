<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Pokemon from './components/Pokemon.vue';
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#00b96b',
      },
    }"
  >
    <HelloWorld message="Olá Ollix" />
    <Pokemon message="Tabela de Pokemons" />
  </a-config-provider>
</template>

<style scoped>

</style>
