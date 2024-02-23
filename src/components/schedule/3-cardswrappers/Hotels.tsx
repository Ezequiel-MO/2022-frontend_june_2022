import React, { useMemo, useState } from 'react'
import { HotelCards } from '../4-cards/HotelCards'
import { TabContent } from '../../atoms'
import { TabList } from '../../molecules'
import { IHotel } from '../../../interfaces'

interface Props {
  hotels: IHotel[]
}

export const Hotels: React.FC<Props> = ({ hotels }) => {
  const [openTab, setOpenTab] = useState(1)

  const hotelsTabItems = useMemo(
    () =>
      hotels.map((hotel) => ({ _id: hotel._id as string, name: hotel.name })),
    [hotels]
  )

  return (
    <div className='flex flex-wrap page-break-after' id='hotels_id'>
      <div className='w-full'>
        <TabList
          tabListItems={hotelsTabItems}
          type='hotel'
          activeTab={openTab}
          setActiveTab={setOpenTab}
          onTabClick={function (id: string): void {
            console.log('function not implemented')
          }}
        />
        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 rounded'>
          <div className='py-5 flex-auto'>
            <div className='tab-content tab-space'>
              {hotels.map((hotel, index) => (
                <TabContent key={hotel._id} activeTab={openTab} index={index}>
                  <HotelCards hotel={hotel} />
                </TabContent>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
