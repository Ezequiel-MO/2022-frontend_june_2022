import { useState } from 'react'
import baseAPI from '../../axios/axiosConfig'
import { IProject } from '../../interfaces'

interface LoginOptions {
  onSuccess: (data: IProject) => void
  onError: (error: Error) => void
}

export const useLogin = ({ onSuccess, onError }: LoginOptions) => {
  const [loading, setLoading] = useState<boolean>(false)
  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      if ([email, password].includes('')) {
        setLoading(false)
        throw new Error('Please fill all fields')
      }
      const {
        data: { token }
      } = await baseAPI.post('/users/client_login', {
        email,
        password
      })
      if (!token) {
        throw new Error('Invalid Email or Password')
      }
      const response = await baseAPI.get(`/projects?code=${password}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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
      localStorage.setItem('token', token)
      onSuccess && onSuccess(response.data.data.data[0])
    } catch (error: any) {
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
