import { Link, useLocation } from 'react-router-dom'
import cutt_logo from '../../assets/CUTT_LOGO.png'

export const Logo = ({ userIsLoggedIn, imageUrl }) => {
  const location = useLocation()

  return (
    <div className='relative z-50 w-5/6 px-6 py-8 text-white md:py-10 md:w-1/2'>
      <Link to='/'>
        {location.pathname === '/' ? (
          ''
        ) : userIsLoggedIn && imageUrl.length > 0 ? (
          <img
            alt='front-end header'
            className='object-cover h-20 absolute top-1 left-10 w-32 z-50'
            src={imageUrl[0]}
          />
        ) : (
          <img
            alt='front-end header'
            className='object-cover h-6 z-50'
            src={cutt_logo}
          />
        )}
      </Link>
    </div>
  )
}
