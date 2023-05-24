import { useState } from 'react'
import { useBudget, useFindByName } from '../../../../hooks'
import { HotelBreakdownRow } from './'
import { Icon } from '@iconify/react'

export const HotelBreakdownRows = ({ hotels, nights }) => {
  const [isOpen, setIsOpen] = useState(true)
  const { hotelName } = useBudget()
  const { selectedOption: selectedHotel } = useFindByName(hotels, hotelName)

  const {
    DUInr,
    DUIprice,
    DoubleRoomNr,
    DoubleRoomPrice,
    DailyTax,
    breakfast
  } = selectedHotel.price[0]

  return (
    <>
      <tr className='w-full bg-white-100 dark:bg-gray-50'>
        <td colSpan={6} className='p-0 bg-transparent'>
          <button
            id='hotel-details'
            className='m-1 py-2 px-4 flex items-center justify-between bg-orange-300 dark:bg-slate-700 dark:hover:bg-slate-500 dark:text-white-0 rounded-md transition duration-500 ease-in-out hover:bg-orange-500 focus:outline-none'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Hide Hotel Details' : 'Show Hotel Details'}
            {isOpen ? (
              <Icon icon='bxs:up-arrow' color='#ea5933' className='ml-2' />
            ) : (
              <Icon icon='bxs:down-arrow' color='#ea5933' className='ml-2' />
            )}
          </button>
        </td>
      </tr>
      {isOpen && (
        <tr className='w-full bg-white-100 dark:bg-gray-50'>
          <td colSpan={6} className='p-0 bg-transparent'>
            <table className='w-full'>
              <thead className='text-white-100 bg-zinc-800'>
                <tr>
                  <td align='center'>Description</td>
                  <td align='center'>Nr. Units </td>
                  <td align='center'>Nr. of nights </td>
                  <td align='center'>Cost per room per night</td>
                  <td align='center'>Total Cost</td>
                </tr>
              </thead>
              <tbody>
                <HotelBreakdownRow
                  units={DUInr}
                  rate={DUIprice}
                  nights={nights}
                  title='Double Room Single Use'
                />
                <HotelBreakdownRow
                  units={DoubleRoomNr}
                  rate={DoubleRoomPrice}
                  nights={nights}
                  title='Double Room //Twin Room'
                />
                <HotelBreakdownRow
                  units={DUInr + DoubleRoomNr * 2}
                  rate={DailyTax}
                  nights={nights}
                  title='City Tax'
                />
                {breakfast ? (
                  <HotelBreakdownRow
                    units={DUInr + DoubleRoomNr * 2}
                    rate={breakfast}
                    nights={nights}
                    title='Breakfast'
                  />
                ) : null}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  )
}
