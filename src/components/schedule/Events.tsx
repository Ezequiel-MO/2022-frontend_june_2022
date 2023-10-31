import { useState, useMemo } from 'react'
import { EventCards } from '.'
import { TabList } from '../molecules'
import { TabContent } from '../atoms'
import { IEvent } from '../../interfaces'

interface Props {
  events: IEvent[]
}

export const Events = ({ events }: Props) => {
  const [openTab, setOpenTab] = useState(1)

  const eventListItems = useMemo(
    () =>
      events.map((event) => ({
        _id: event._id,
        name: event.name
      })),
    [events]
  )

  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full'>
          <TabList
            tabListItems={eventListItems}
            type='event'
            activeTab={openTab}
            setActiveTab={setOpenTab}
          />

          <div className='relative flex flex-col min-w-0 break-words w-full mb-6 rounded'>
            <div className='py-5 flex-auto'>
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
