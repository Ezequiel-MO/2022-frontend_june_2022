import React, { useMemo } from 'react'
import { useActiveTab } from '../../context/ActiveTabProvider'
import { useCurrentProject } from '../../hooks'
import { HotelCards } from './HotelCards'
import { TabContent } from '../atoms'
import { TabList } from '../molecules'
import { IHotel, IProject } from '../../interfaces'

interface Props {
  hotels: IHotel[]
}

export const Hotels: React.FC<Props> = ({ hotels }) => {
  const { activeTab, setActiveTab } = useActiveTab()
  const { currentProject } = useCurrentProject() as { currentProject: IProject }
  const { suplementaryText } = currentProject

  const hotelsTabItems = useMemo(
    () =>
      hotels.map((hotel) => ({ _id: hotel._id as string, name: hotel.name })),
    [hotels]
  )

  const renderNoAccommodation = () =>
    suplementaryText && (
      <h3 className='italic m-2'>No accommodation added to the budget</h3>
    )

  const renderHotels = () => (
    <div className='w-full'>
      <TabList
        tabListItems={hotelsTabItems}
        type='hotel'
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 rounded'>
        <div className='py-5 flex-auto'>
          <div className='tab-content tab-space'>
            {hotels.map((hotel, index) => (
              <TabContent key={hotel._id} activeTab={activeTab} index={index}>
                <HotelCards hotel={hotel} />
              </TabContent>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className='flex flex-wrap page-break-after' id='hotels_id'>
      {hotels.length > 0 ? renderHotels() : renderNoAccommodation()}
    </div>
  )
}
