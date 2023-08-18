import React, { useState } from 'react'
import { useBudget, useFindByName } from '../../../../hooks'
import { HotelBreakdownRow } from '.'
import { Icon } from '@iconify/react'
import { IHotel } from '../../../../interfaces'

interface Props {
  hotels: IHotel[]
  nights: number
}

export const HotelBreakdownRows = ({ hotels, nights }: Props) => {
  const [isOpen, setIsOpen] = useState(true)
  const { hotelName } = useBudget()
  const { selectedOption: foundOption } = useFindByName(hotels, hotelName)

  if (!foundOption || !('price' in foundOption)) return null

  const selectedHotel = foundOption as IHotel

  const {
    DUInr = 0,
    DUIprice = 0,
    DoubleRoomNr = 0,
    DoubleRoomPrice = 0,
    DailyTax = 0,
    breakfast = 0
  } = selectedHotel.price[0]

  return (
    <>
      <tr className='w-full bg-white-100 dark:bg-[#a9ba9d]'>
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
        <tr className='w-full bg-white-100 dark:bg-[#a9ba9d] relative'>
          <div className='absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-20 z-0'>
            <Icon icon='ic:twotone-local-hotel' width={300} />
          </div>
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
              <tbody className='dark:text-[#000]'>
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
