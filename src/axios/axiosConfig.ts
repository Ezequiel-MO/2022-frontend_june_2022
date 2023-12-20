import axios, { AxiosInstance } from 'axios'

const baseAPI: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export default baseAPI
