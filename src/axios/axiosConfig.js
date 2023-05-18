import axios from 'axios'

const baseAPI = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}` || 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export default baseAPI
