
import axios from 'axios'

const api = axios.create({ baseURL: process.env.REACT_APP_API })

api.interceptors.request.use(async config => {
    const token = localStorage.getItem("TOKEN")
    if (token) {
        config.headers.Authorization = token
    }
    return config
})

export default api;