import { useState } from 'react'
import { BudgetBreakdownButton } from '../../../../molecules'
import { Icon } from '@iconify/react'
import { IRestaurant } from '../../../../../interfaces'
import { MeetingBreakdownRow } from '../meeting'

interface Props {
  date: string
  id: 'lunch ' | 'dinner'
  venue: IRestaurant
  units: number
}

export const VenueBreakdownRows = ({ date, id, venue, units }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <BudgetBreakdownButton
        onClick={handleToggle}
        item='Venue'
        isOpen={isOpen}
      />
      <tr>
        <td colSpan={6} className='p-0 bg-transparent'>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <table className='w-full'>
              <tbody className='w-full bg-white-100 dark:bg-[#a9ba9d] relative'>
                <tr>
                  <div className='absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-20 z-0'>
                    <Icon icon='ph:castle-turret-light' width={250} />
                  </div>
                  <table className='w-full'>
                    <thead className='text-white-100 bg-zinc-800'>
                      <tr>
                        <td align='center'>Description</td>
                        <td align='center'>Nr. Units </td>
                        <td align='center'></td>
                        <td align='center'>Unit Cost</td>
                        <td align='center'>Total Cost</td>
                      </tr>
                    </thead>
                    <tbody className='text-[#000]'>
                      <MeetingBreakdownRow
                        units={1}
                        title='Full Day Rental Rate'
                        rate={venue.venue_price?.rental || 0}
                      />
                      <MeetingBreakdownRow
                        units={venue.venue_price?.cocktail_units || 0}
                        title='Cocktail Reception'
                        rate={venue.venue_price?.cocktail_price || 0}
                      />
                      <MeetingBreakdownRow
                        units={venue.venue_price?.catering_units || 0}
                        title='3 - Course Menu'
                        rate={venue.venue_price?.catering_price || 0}
                      />
                      <MeetingBreakdownRow
                        units={1}
                        title='Audiovisual Equipment'
                        rate={venue.venue_price?.audiovisuals || 0}
                      />
                      <MeetingBreakdownRow
                        units={1}
                        title='Cleaning'
                        rate={venue.venue_price?.cleaning || 0}
                      />
                      <MeetingBreakdownRow
                        units={1}
                        title='Security'
                        rate={venue.venue_price?.security || 0}
                      />
                      <MeetingBreakdownRow
                        units={1}
                        title='Entertainment'
                        rate={venue.venue_price?.entertainment || 0}
                      />
                      <MeetingBreakdownRow
                        units={venue.venue_price?.staff_units || 0}
                        title='Staff Meals'
                        rate={venue.venue_price?.staff_menu_price || 0}
                      />
                    </tbody>
                  </table>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </>
  )
}
