import { Collapse } from '@mui/material'
import { useBudget, useFindByName } from '../../../../hooks'
import { HotelBreakdownRow } from './'

export const HotelBreakdownRows = ({ hotels, nights }) => {
  const { breakdownOpen, hotelName } = useBudget()
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
    <tr className='w-full bg-white-100 dark:bg-gray-50'>
      <td colSpan={6} className='p-0'>
        <Collapse in={breakdownOpen['hotel']} timeout='auto' unmountOnExit>
          <div className='w-full mx-auto '>
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
          </div>
        </Collapse>
      </td>
    </tr>
  )
}
