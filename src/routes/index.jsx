import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import LoginPage from '../components/login/LoginPage'
import AuthLayout from '../layouts/AuthLayout'
import ProtectedRoute from '../layouts/ProtectedRoute'
import Credentials from '../screens/Credentials'
import Destination from '../screens/Destination'
import MainPage from '../screens/MainPage'
import NotFound from '../ui/NotFound'
import { ErrorPage } from './error-page'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
      </Route>
      <Route
        path='app'
        element={<ProtectedRoute />}
        errorElement={<ErrorPage />}
      >
        <Route index element={<MainPage />} />
        <Route path='credentials' element={<Credentials />} />
        <Route path='destination_info' element={<Destination />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)
