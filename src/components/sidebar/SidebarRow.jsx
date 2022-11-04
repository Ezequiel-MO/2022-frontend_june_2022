import { Icon } from '@iconify/react'
import { useState } from 'react'
import { Link } from 'react-scroll'
import { useActiveTab } from '../../context/ActiveTabProvider'
import { useCurrentProject } from '../../hooks/useCurrentProject'

function SidebarRow({ iconText, title, modal = false, handleOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { currentProject } = useCurrentProject()
  const { hotels, schedule } = currentProject
  const { activeTab, setActiveTab, handleChange } = useActiveTab()

  if (modal) {
    return (
      <div
        data-for='main'
        data-tip={title}
        data-iscapture='true'
        className='flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-green-50 cursor-pointer transition-all duration-200 group'
        onClick={() => handleOpen(`${title}`)}
      >
        <Icon icon={iconText} color='#ea5933' width='40' />
        <p className='group-hover:text-orange-50 hidden md:inline-flex text-base lg:text-lg'>
          {title.replace(/^\w/, (c) => c.toUpperCase())}
        </p>
      </div>
    )
  }
  return (
    <>
      <Link
        to={`${title}_id`}
        spy={true}
        smooth={true}
        duration={500}
        offset={-100}
        className='flex items-center space-x-2 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group'
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <div
          className='flex-shrink-0'
          data-for='main'
          data-tip={title}
          data-iscapture='true'
        >
          <Icon icon={iconText} color='#ea5933' width='40' />
        </div>
        <p className='group-hover:text-orange-50 hidden md:inline-flex text-base lg:text-lg'>
          {title.replace(/^\w/, (c) => c.toUpperCase())}
        </p>
      </Link>
      <Link
        to={`${title}._id`}
        spy={true}
        smooth={true}
        duration={700}
        offset={-100}
        className={`${
          menuOpen
            ? 'inline-block transition-all ease-in-out duration-300'
            : 'opacity-0 h-0'
        }`}
      >
        {title === 'hotels' && (
          <div
            className={`${
              menuOpen ? 'flex flex-col' : 'hidden'
            } bg-orange-50 rounded transition-all ease-in-out duration-300 space-y-4 p-4 ml-4`}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            {hotels?.map((hotel, index) => (
              <p
                onClick={() => handleChange(index + 1)}
                key={index}
                className={`${
                  activeTab === index + 1 ? 'text-white-100' : ''
                } hover:text-white-100 hover:cursor-pointer hidden md:inline-flex text-sm lg:text-base`}
              >
                {hotel.name.replace(/^\w/, (c) => c.toUpperCase())}
              </p>
            ))}
          </div>
        )}
        {schedule?.map(
          (day) =>
            title === day.date && (
              <div
                key={day._id}
                className={`${
                  menuOpen ? 'flex flex-col' : 'hidden'
                } rounded transition-all ease-in-out duration-300 space-y-4 p-4 ml-4 hover:bg-orange-50 `}
                onMouseEnter={() => setMenuOpen(true)}
                onMouseLeave={() => setMenuOpen(false)}
              >
                <div className='flex flex-col'>
                  {day.morningEvents?.length > 0 ? (
                    <span className='text-white-50 hover:text-white-100 hover:cursor-pointer hidden md:inline-flex text-sm lg:text-base'>
                      Morning Events
                    </span>
                  ) : null}
                  {day.morningMeetings?.length > 0 ? (
                    <span className='text-white-50 hover:text-white-100 hover:cursor-pointer hidden md:inline-flex text-sm lg:text-base'>
                      Morning Meetings
                    </span>
                  ) : null}
                  {day.lunch?.length > 0 ? (
                    <span className='text-white-50 hover:text-white-100 hover:cursor-pointer hidden md:inline-flex text-sm lg:text-base'>
                      Lunch
                    </span>
                  ) : null}
                  {day.afternoonEvents?.length > 0 ? (
                    <span className='text-white-50 hover:text-white-100 hover:cursor-pointer hidden md:inline-flex text-sm lg:text-base'>
                      Afternoon Events
                    </span>
                  ) : null}
                  {day.afternoonMeetings?.length > 0 ? (
                    <span className='text-white-50 hover:text-white-100 hover:cursor-pointer hidden md:inline-flex text-sm lg:text-base'>
                      Afternoon Meetings
                    </span>
                  ) : null}
                  {day.dinner?.length > 0 ? (
                    <span className='text-white-50 hover:text-white-100 hover:cursor-pointer hidden md:inline-flex text-sm lg:text-base'>
                      Dinner
                    </span>
                  ) : null}
                  {day.fulldayMeetings?.length > 0 ? (
                    <span className='text-white-50 hover:text-white-100 hover:cursor-pointer hidden md:inline-flex text-sm lg:text-base'>
                      Full Day Meetings
                    </span>
                  ) : null}
                </div>
              </div>
            )
        )}
      </Link>
    </>
  )
}

export default SidebarRow
