<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'HelloWorld',
    props: {
        message: {
            type: String as PropType<string>,
        },
    },
    setup(props) {
        const store = useStore()

        const count = computed(() => store.state.count)

        const increment = () => {
            store.commit('increment')
        }

        return {
            count,
            increment,
        }
    },
})
</script>

<template>
    <div>
        <p>{{ message }}</p>
        <div style="display: flex; align-items: center">
            <p style="margin: unset; margin-right: 5px">Count: {{ count }}</p>
            <a-button @click="increment">Somar</a-button>
        </div>
    </div>
</template>

<style scoped></style>
