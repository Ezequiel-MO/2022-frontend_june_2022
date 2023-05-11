import axios from 'axios'

const baseAPI = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`
})

// Add a request interceptor
baseAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || null
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default baseAPI
