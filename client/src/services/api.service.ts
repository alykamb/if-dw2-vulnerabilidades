import axios from 'axios'

const el = document.getElementsByName('csrf_token')?.[0]

export const apiService = axios.create({
    withCredentials: true,
    baseURL: '/api/v1/',
})

if (el) {
    const token = el.getAttribute('content')
    if (token) {
        apiService.interceptors.request.use((config) => {
            if (!config.headers) {
                config.headers = {}
            }
            config.headers['X-Csrf-Token'] = token

            return config
        })
    }
}
