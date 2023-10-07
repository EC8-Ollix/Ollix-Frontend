<template>
    <div
        class="content-template"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'Content',
    setup() {
        const isHovered = ref(false)

        return { isHovered }
    },
})
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
