import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface Error {
  statusText?: string
  message?: string
}

export const ErrorPage: React.FC = () => {
  const error: Error = useLocation().state as Error
  const navigate = useNavigate()

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <main
        id='error-page'
        className=' container mx-auto mt-4 md:mt-15 p-5 md:flex md:justify-center flex items-center '
      >
        <p className='text-4xl font-bold'>404 |</p>
        <p className='text-4xl ml-10'>
          <i>{error.statusText || error.message}</i>
        </p>
      </main>
      <button onClick={() => navigate(-1)}>Back to Previous Page</button>
    </div>
  )
}
