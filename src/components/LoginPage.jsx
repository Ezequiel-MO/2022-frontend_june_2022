import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import baseAPI from '../axios/axiosConfig'
import { useUserLog } from '../hooks/useUserLog'
import { useCurrentProject } from '../hooks/useCurrentProject'
import { useBudget } from '../hooks/useBudget'
import Alert from '../ui/Alert'
import { Icon } from '@iconify/react'
import Spinner from '../ui/spinner/Spinner'

const LoginPage = () => {
  const navigate = useNavigate()
  const [visiblePassword, setVisiblePassword] = useState(false)
  const { setCurrentProject, currentProject } = useCurrentProject()
  const { setBudgetSchedule } = useBudget()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})
  
  //initializing a loading state
  const [loading, setLoading] = useState(false)

  const { logUserIn } = useUserLog()

  const handleSubmit = async (e) => {
    e.preventDefault()
    //setting the loading state to true when user presses login button
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
  return (
    <>
      {loading ? 
        <div className='flex items-center justify-center mt-20'>
          <Spinner />
        </div>
      :
      <>
        <h1 className='font-black text-4xl capitalize'>
          Login <span className='text-white-100'>to APP</span>
        </h1>
        {msg && <Alert alert={alert} />}
        <form
          className='my-8 bg-gray-50 rounded-lg px-10 py-5'
          onSubmit={handleSubmit}
        >
          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'
              htmlFor='email'
            >
              USER EMAIL - provided in the email
            </label>
            <input
              className='w-full mt-3 p-3 border rounded-xl bg-gray-100'
              id='email'
              type='text'
              placeholder='User Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='my-5 relative'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'
              htmlFor='password'
            >
              Code - must be 11 digits long
            </label>
            <input
              className='w-full mt-3 p-3 border rounded-xl bg-gray-100'
              id='password'
              type={visiblePassword ? 'text' : 'password'}
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type='button'
              onClick={togglePassword}
              className='absolute top-[60px] right-5 cursor-pointer'
            >
              <Icon
                icon={
                  visiblePassword
                    ? 'ant-design:eye-invisible-twotone'
                    : 'ant-design:eye-twotone'
                }
                width='30'
              />
            </button>
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='my-5 text-white-100 bg-orange-50 w-full py-2 uppercase font-bold rounded hover:cursor-pointer hover:bg-white-100 hover:text-orange-50 transition-colors'
              type='submit'
            >
              Sign In
            </button>
          </div>
        </form>
      </>
      }
   </>
  )
}

export default LoginPage
