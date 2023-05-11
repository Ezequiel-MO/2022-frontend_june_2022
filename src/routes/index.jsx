import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../components/login/LoginPage'
import { AuthLayout, ProtectedRoute } from '../layouts'
import { Credentials, Destination, MainPage } from '../screens'
import NotFound from '../ui/NotFound'
import { ErrorPage } from './error-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />
      }
    ]
  },
  {
    path: '/app',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: 'credentials',
        element: <Credentials />
      },
      {
        path: 'destination_info',
        element: <Destination />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])
