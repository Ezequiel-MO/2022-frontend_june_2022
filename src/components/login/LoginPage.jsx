import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import baseAPI from '../../axios/axiosConfig'
import { useUserLog } from '../../hooks/useUserLog'
import { useCurrentProject } from '../../hooks/useCurrentProject'
import { useBudget } from '../../hooks/useBudget'
import Spinner from '../../ui/spinner/Spinner'
import LoginForm from './LoginForm'

const LoginPage = () => {
  const navigate = useNavigate()
  const [visiblePassword, setVisiblePassword] = useState(false)
  const { setCurrentProject } = useCurrentProject()
  const { setBudgetSchedule, setHotels } = useBudget()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})

  const [loading, setLoading] = useState(false)

  const { logUserIn } = useUserLog()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if ([email, password].includes('')) {
      setAlert({
        error: true,
        msg: 'Please fill in all fields'
      })
      setLoading(false)
      return
    }
    try {
      const response = await baseAPI.get(`/v1/projects?code=${password}`)
      const receivedData = response.data.data.data.length !== 0

      if (!receivedData) {
        setAlert({
          error: true,
          msg: 'Invalid password, please check your email instructions'
        })
        setLoading(false)
        return
      }
      const clientEmail = response.data.data.data[0].clientAccManager[0].email

      if (email !== clientEmail) {
        setAlert({
          error: true,
          msg: 'Invalid email, please check your email instructions'
        })
        setLoading(false)
        return
      }

      localStorage.setItem(
        'schedule',
        JSON.stringify(response.data.data.data[0].schedule)
      )
      localStorage.setItem(
        'hotels',
        JSON.stringify(response.data.data.data[0].hotels)
      )
      localStorage.setItem(
        'currentProject',
        JSON.stringify(response.data.data.data[0])
      )
      setAlert({
        error: false,
        msg: 'Access Granted'
      })
      logUserIn()
      localStorage.setItem('userIsLogged', true)
      setCurrentProject(response.data.data.data[0])

      setBudgetSchedule(response.data.data.data[0].schedule)
      setHotels(response.data.data.data[0].hotels)
      navigate('/app')
      setLoading(false)
    } catch (error) {
      setAlert({
        error: true,
        msg: 'Invalid email or password'
      })
      setLoading(false)
    }
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
