import { useState } from 'react'
import { RestaurantCards } from './'
import { TabList } from '../molecules'
import { TabContent } from '../atoms'

export const Meals = ({ restaurants }) => {
  const [openTab, setOpenTab] = useState(1)

  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full'>
          <TabList
            tabListItems={restaurants}
            activeTab={openTab}
            setActiveTab={setOpenTab}
          />

          <div className='relative flex flex-col min-w-0 break-words w-full mb-6 rounded'>
            <div className='px-4 py-5 flex-auto'>
              <div className='tab-content tab-space'>
                {restaurants.map((restaurant, index) => (
                  <TabContent key={index} activeTab={openTab} index={index}>
                    <RestaurantCards restaurant={restaurant} />
                  </TabContent>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
