<template>
    <div class="content-template" @mouseover="isHovered = true" @mouseleave="isHovered = false">

        <Dashboard />

    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Dashboard  from '../Dashboard/Dashboard.vue';

export default defineComponent({
  name: 'Content',
  components: {Dashboard},
  setup() {
    const isHovered = ref(false);

    return { isHovered };
  }
});
</script>

<style scoped>
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