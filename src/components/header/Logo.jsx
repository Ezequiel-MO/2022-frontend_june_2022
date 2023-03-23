import { Link, useLocation } from 'react-router-dom'
import cutt_logo from '../../assets/CUTT_LOGO.png'

export const Logo = ({ userIsLoggedIn, imageUrl }) => {
  const location = useLocation()

  const getLogoImage = () => {
    if (location.pathname === '/') {
      return ''
    }

    if (userIsLoggedIn && imageUrl?.length > 0) {
      return (
        <img
          alt='front-end header'
          className='object-cover object-left w-full h-auto md:h-36 absolute -top-4 left-0 z-50'
          src={imageUrl[0]}
        />
      )
    }

    return (
      <img
        alt='front-end header'
        className='object-cover h-6 z-50'
        src={cutt_logo}
      />
    )
  }

  return (
    <div className='z-50 w-5/6 px-6 py-8 text-white md:py-10 md:w-1/2'>
      <Link to='/'>{getLogoImage()}</Link>
    </div>
  )
}
