<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: "HelloWorld",
  props: {
    message: {
      type: String as PropType<string>,
      required: true,
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
    <p>Count: {{ count }}</p>
    <a-button @click="incrementCount">Somar</a-button>
  </div>
</template>

<style scoped>

</style>
