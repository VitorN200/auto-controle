import axios from 'axios'

// Em produção a API responde no mesmo endereço do site: VITE_API_URL fica vazio.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000'
})

export default api
