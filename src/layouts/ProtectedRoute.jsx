import { Navigate, Outlet } from 'react-router-dom'
import { Header } from '../components'
import { useUserLog } from '../hooks'

const ProtectedRoute = () => {
  const { userIsLoggedIn } = useUserLog()
  if (!userIsLoggedIn) {
    return <Navigate to='/' replace />
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default ProtectedRoute
