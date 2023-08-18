import { useEffect } from 'react'
import { TableCell, TableRow } from '@mui/material'
import { useBudget, useFindByName } from '../../../../hooks'
import { HotelTotalCostContainer } from '.'
import { OptionSelect } from '../multipleOrSingle'
import { IHotelPrice } from '../../../../interfaces'

interface HotelSummaryRowProps {
  nights: number
}

export const HotelSummaryRow = ({ nights }: HotelSummaryRowProps) => {
  const { hotels, hotelName, updateHotelTotalCost, setSelectedHotelName } =
    useBudget()

  const { selectedOption: selectedHotel } = useFindByName(hotels, hotelName)

  useEffect(() => {
    if (hotels?.length > 0 && selectedHotel) {
      const { price, _id } = selectedHotel as {
        price: IHotelPrice[]
        _id: string
      }
      updateHotelTotalCost(price, _id, nights)
    }
  }, [hotels, nights, updateHotelTotalCost, selectedHotel])

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedHotelName(e.target.value as string)
  }

  return (
    <>
      <TableRow className='dark:bg-[#a9ba9d]'>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>
          <OptionSelect
            options={hotels}
            value={hotelName || hotels[0].name}
            handleChange={handleChange}
          />
        </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <HotelTotalCostContainer />
      </TableRow>
    </>
  )
}
