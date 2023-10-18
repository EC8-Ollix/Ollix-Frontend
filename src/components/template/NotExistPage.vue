<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
    name: 'NotExistPage',
    setup(props) {
        const router = useRouter()

        const gotHome = () => {
            router.push('/')
        }

        return {
            gotHome,
        }
    },
})
</script>

<template>
    <a-result
        status="404"
        title="404"
        sub-title="Desculpe, essa página que você acessou não existe"
        style="height: calc(100vh - 60px); margin: 100px"
    >
        <template #extra>
            <a-button @click="gotHome" type="primary"
                >Ir para Pagina Incial</a-button
            >
        </template>
    </a-result>
</template>
