import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
})

// Função para definir o token de autorização:
export function setAuthToken(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Função para remover o token de autorização (por exemplo, em logout):
export function removeAuthToken() {
    delete api.defaults.headers.common['Authorization']
}
