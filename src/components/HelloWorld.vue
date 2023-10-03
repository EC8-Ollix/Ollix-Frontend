<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: "HelloWorld",
  props: {
    message: {
      type: String as PropType<string>,
    },
  },
  setup(props) {
    const count = ref(0);

    const incrementCount = () => {
      count.value++;
    };

    return {
      count,
      incrementCount,
    };
  }
});
</script>

<template>
  <div>
    <p>{{ message }}</p>
    <div style="display: flex;
      align-items: center;">
      <p style="margin:unset; margin-right: 5px;">Count: {{ count }}</p>
      <a-button @click="incrementCount">Somar</a-button> 
    </div>
  </div>
</template>

<style scoped>

</style>
