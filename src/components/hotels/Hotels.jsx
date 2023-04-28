import { useActiveTab } from '../../context/ActiveTabProvider'
import { useCurrentProject } from '../../hooks'
import HotelCards from './HotelCards'
import { TabContent } from '../atoms'
import { TabList } from '../molecules'

const Hotels = ({ hotels }) => {
  const { activeTab, setActiveTab } = useActiveTab()
  const { currentProject } = useCurrentProject()
  const { suplementaryText } = currentProject

  return (
    <>
      <div className='flex flex-wrap page-break-after' id='hotels_id'>
        {hotels?.length > 0 ? (
          <div className='w-full'>
            <TabList
              tabListItems={hotels}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 rounded'>
              <div className='px-4 py-5 flex-auto'>
                <div className='tab-content tab-space'>
                  {hotels.map((hotel, index) => (
                    <TabContent
                      key={hotel._id}
                      activeTab={activeTab}
                      index={index}
                    >
                      <HotelCards hotel={hotel} />
                    </TabContent>
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
