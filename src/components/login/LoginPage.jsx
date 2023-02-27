import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBudget, useCurrentProject, useUserLog } from '../../hooks'
import Spinner from '../../ui/spinner/Spinner'
import LoginForm from './LoginForm'
import { useLogin } from './useLogin'

const LoginPage = () => {
  const navigate = useNavigate()
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})
  const { setCurrentProject } = useCurrentProject()
  const { setBudgetSchedule, setHotels } = useBudget()
  const { logUserIn } = useUserLog()

  const { login, loading } = useLogin({
    onSuccess: (data) => {
      localStorage.setItem('schedule', JSON.stringify(data.schedule))
      localStorage.setItem('hotels', JSON.stringify(data.hotels))
      localStorage.setItem('currentProject', JSON.stringify(data))
      setAlert({
        error: false,
        msg: 'Access Granted'
      })
      logUserIn()
      localStorage.setItem('userIsLogged', true)
      setCurrentProject(data)

      setBudgetSchedule(data.schedule)
      setHotels(data.hotels)
      navigate('/app')
    },
    onError: (error) => {
      setAlert({
        error: true,
        msg: error.message
      })
    }
  })

  const handleSubmit = async (e) => {
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
