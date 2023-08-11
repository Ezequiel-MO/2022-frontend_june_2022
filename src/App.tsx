import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import './App.css'

function App() {
  return (
    <div className='dark:bg-black-50 text-lg text-black-50 dark:text-gray-100 p-2 min-h-screen'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
