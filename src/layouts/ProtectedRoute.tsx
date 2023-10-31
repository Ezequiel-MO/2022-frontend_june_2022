import { Navigate, Outlet } from 'react-router-dom'
import { Header } from '../components'
import { useUserLog } from '../hooks'

export const ProtectedRoute: React.FC = () => {
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
