import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useEffect, useState } from 'react'
import { BudgetContext } from '../../context/context'
import HotelBreakdownRow from './HotelBreakdownRow'

const HotelBreakdownRows = ({ hotels, nights }) => {
  const [selectedHotel, setSelectedHotel] = useState(hotels[0])
  const { budgetValues } = useContext(BudgetContext)
  const { selectedHotelName, hotelBreakdownOpen } = budgetValues

  useEffect(() => {
    if (selectedHotelName) {
      setSelectedHotel(hotels.find((hotel) => hotel.name === selectedHotelName))
    }
  }, [selectedHotelName, hotels])

  const {
    DUInr,
    DUIprice,
    DoubleRoomNr,
    DoubleRoomPrice,
    DailyTax,
    breakfast
  } = selectedHotel.price[0]

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={hotelBreakdownOpen} timeout='auto' unmountOnExit>
          <Box margin={1}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Nr. Units </TableCell>
                  <TableCell>Nr. of nights </TableCell>
                  <TableCell>Cost per room per night</TableCell>
                  <TableCell>Total Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
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
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}

export default HotelBreakdownRows
