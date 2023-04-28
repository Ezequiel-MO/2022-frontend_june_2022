import { useState } from 'react'
import { EventCards } from './'
import { TabList } from '../molecules'
import { TabContent } from '../atoms'

export const Events = ({ events }) => {
  const [openTab, setOpenTab] = useState(1)
  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full'>
          <TabList
            tabListItems={events}
            activeTab={openTab}
            setActiveTab={setOpenTab}
          />

          <div className='relative flex flex-col min-w-0 break-words w-full mb-6 rounded'>
            <div className='px-4 py-5 flex-auto'>
              <div className='tab-content tab-space'>
                {events.map((event, index) => (
                  <TabContent key={index} activeTab={openTab} index={index}>
                    <EventCards event={event} />
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
