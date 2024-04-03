import { useNavigate } from 'react-router-dom'
import { useCurrentProject } from '../../hooks'

const HeaderDropdown = ({ groupLocation }) => {
  const navigate = useNavigate()
  const { currentProject } = useCurrentProject()
  const { accountManager = [] } = currentProject
  const { firstName, familyName } = accountManager[0] || {}
  /*   const handleRoute = (route) => {
    navigate(route)
  } */
  return (
    <div>
      <div className='font-bold text-black-50 border-3 border-b border-gray-500 p-3 mr-10 flex flex-col'>
        <p className='hover:text-orange-700 hover:cursor-pointer'>
          Your Account Manager,
          <span className='text-white-100 bg-black-50 p-2'>{` ${firstName} ${familyName}`}</span>
        </p>
        {/*         <div
          className='flex items-center space-x-2 hover:text-orange-700 hover:cursor-pointer'
          onClick={() => handleRoute('/app/destination_info')}
        >
          <span>Destination Information, </span>
          <span className='text-orange-500'>{groupLocation}</span>
        </div>

        <span
          className='hover:text-orange-700 hover:cursor-pointer'
          onClick={() => handleRoute('/app/credentials')}
        >
          Our Credentials
        </span> */}
      </div>
    </div>
  )
}

export default HeaderDropdown
