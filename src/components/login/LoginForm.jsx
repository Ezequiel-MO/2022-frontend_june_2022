import { Icon } from '@iconify/react'
import Alert from '../../ui/Alert'

const LoginForm = ({
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
  )
}

export default LoginForm