import { useActiveTab } from '../../context/ActiveTabProvider'
import { useCurrentProject } from '../../hooks'
import HotelCards from './HotelCards'

const Hotels = ({ hotels }) => {
  const { activeTab, setActiveTab, change } = useActiveTab()
  const { currentProject } = useCurrentProject()
  const { suplementaryText } = currentProject

  return (
    <>
      <div className='flex flex-wrap' id='hotels_id'>
        {hotels?.length > 0 ? (
          <div className='w-full'>
            <ul
              className='flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row'
              role='tablist'
            >
              {hotels?.map((hotel, index) => (
                <li
                  key={hotel._id}
                  className='mr-2 last:mr-0 flex-auto'
                  id={hotel._id}
                >
                  <a
                    className={`${
                      change && activeTab === index + 1
                        ? 'bg-blue-500 dark:bg-blue-50 transition-all ease-in-out'
                        : 'bg-white-100 dark:bg-gray-50 transition-all ease-in-out'
                    } text-sm font-bold uppercase px-5 py-3 shadow-sm rounded block leading-normal bg-white-100 hover:bg-gray-100 dark:bg-gray-50 dark:hover:bg-green-50 dark:hover:text-black-50 focus:outline-none focus:shadow-outline`}
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveTab(index + 1)
                    }}
                    href={`#tab${index + 1}`}
                    role='tablist'
                  >
                    {hotel.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 rounded'>
              <div className='px-4 py-5 flex-auto'>
                <div className='tab-content tab-space'>
                  {hotels.map((hotel, index) => (
                    <div
                      key={hotel._id}
                      className={activeTab === index + 1 ? 'block' : 'hidden'}
                      id={`tab${index + 1}`}
                    >
                      <HotelCards hotel={hotel} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : suplementaryText === true ? (
          <h3 className='italic m-2'>No accommodation added to the budget</h3>
        ) : null}
      </div>
    </>
  )
}

export default Hotels
