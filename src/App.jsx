import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import './App.css'
import { useDarkMode } from './hooks'

function App() {
  const { isDarkMode } = useDarkMode()
  return (
    <div
      className={`${
        isDarkMode
          ? 'dark:bg-black-50 text-white-50'
          : 'bg-gray-100 text-black-50'
      } text-lg min-h-screen`}
    >
      <RouterProvider router={router} />
    </div>
  )
}

export default App
