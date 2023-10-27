import React, { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBudget, useCurrentProject, useUserLog } from '../../hooks'
import Spinner from '../../ui/spinner/Spinner'
import { saveToLocalStorage } from './helperFunctions'
import LoginForm from './LoginForm'
import { useLogin } from './useLogin'
import { IDay, IHotel, IProject } from '../../interfaces'

interface Alert {
  error: boolean
  msg: string
}

interface Data extends IProject {
  schedule: IDay[]
  hotels: IHotel[]
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [alert, setAlert] = useState<Alert>({ error: false, msg: '' })

  const { setCurrentProject } = useCurrentProject()
  const { setBudgetSchedule, setHotels } = useBudget()
  const { logUserIn } = useUserLog()

  const { login, loading } = useLogin({
    onSuccess: (data: Data) => {
      saveToLocalStorage(data)
      setAlert({
        error: false,
        msg: 'Access Granted'
      })
      logUserIn()
      setCurrentProject(data)
      setBudgetSchedule(data.schedule)
      setHotels(data.hotels)
      navigate('/app')
    },
    onError: (error: any) => {
      setAlert({
        error: true,
        msg: error.response.data.msg ?? ''
      })
    }
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    login(email, password)
  }

  const togglePassword = () => {
    setVisiblePassword((prevState) => !prevState)
  }

  const { msg } = alert

  const LoginFormProps = {
    msg,
    alert,
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword,
    togglePassword,
    visiblePassword
  }

  return (
    <>
      {loading ? (
        <div className='flex items-center justify-center mt-20'>
          <Spinner />
        </div>
      ) : (
        <LoginForm {...LoginFormProps} />
      )}
    </>
  )
}

export default LoginPage
