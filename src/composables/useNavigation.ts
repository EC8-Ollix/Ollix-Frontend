import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export function useNavigation() {
    const router = useRouter()
    const route = useRoute()

    const goBack = () => {
        if (route.fullPath !== '/auth') {
            router.go(-1)
        }
    }

    return {
        goBack,
    }
}
