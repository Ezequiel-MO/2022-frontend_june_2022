import { ChangeEvent, FormEvent } from 'react'
import { Icon } from '@iconify/react'
import Alert from '../../ui/Alert'

interface AlertProps {
  error: boolean
  msg: string
}

interface LoginFormProps {
  msg: string
  alert: AlertProps
  handleSubmit: (e: FormEvent) => void
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  togglePassword: () => void
  visiblePassword: boolean
}

const LoginForm: React.FC<LoginFormProps> = ({
  msg,
  alert,
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  togglePassword,
  visiblePassword
}) => {
  return (
    <div className='w-[500px] mx-auto pt-5'>
      <h1 className='font-black text-4xl capitalize'>
        Login <span className='text-secondary'>to APP</span>
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
            className='w-full mt-3 p-3 border rounded-xl bg-gray-100 dark:text-black-50'
            id='email'
            type='text'
            placeholder='User Email'
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
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
            className='w-full mt-3 p-3 border rounded-xl bg-gray-100 dark:text-black-50'
            id='password'
            type={visiblePassword ? 'text' : 'password'}
            placeholder='Enter password'
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <button
            type='button'
            onClick={togglePassword}
            className='absolute top-[53px] rounded right-5 cursor-pointer dark:bg-orange-50 dark:text-white-100 bg-white-100 text-orange'
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
            className='my-5 text-white-100 bg-primary w-full py-2 uppercase font-bold rounded hover:cursor-pointer hover:bg-white-100 hover:text-primary transition-colors'
            type='submit'
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
