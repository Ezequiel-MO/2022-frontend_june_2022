import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import './App.css'
import { useEffect, useState } from 'react'
import { fetchSettings } from './helpers/fetchSettings'
import Spinner from './ui/spinner/Spinner'

function App() {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    fetchSettings().then(() => {
      setIsInitialized(true)
    })
  }, [])

  if (!isInitialized) {
    return <Spinner />
  }
  return (
    <div className='dark:bg-black-50 text-lg text-black-50 dark:text-gray-100 p-2 min-h-screen'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
