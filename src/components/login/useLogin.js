import { useState } from 'react'
import baseAPI from '../../axios/axiosConfig'

export const useLogin = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState(false)
  const login = async (email, password) => {
    try {
      setLoading(true)
      if ([email, password].includes('')) {
        setLoading(false)
        throw new Error('Please fill all fields')
      }
      const response = await baseAPI.get(`/projects?code=${password}`)
      const receivedData = response.data.data.data.length !== 0
      if (!receivedData) {
        setLoading(false)
        throw new Error('Invalid Email or Password')
      }
      const clientEmail = response.data.data.data[0].clientAccManager[0].email
      if (email !== clientEmail) {
        setLoading(false)
        throw new Error('Invalid Email')
      }
      setLoading(false)
      onSuccess && onSuccess(response.data.data.data[0])
    } catch (error) {
      setLoading(false)
      onError && onError(error)
    } finally {
      setLoading(false)
    }
  }
  return {
    login,
    loading
  }
}
