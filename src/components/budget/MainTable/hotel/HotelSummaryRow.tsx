import { useEffect } from 'react'
import { useBudget, useFindByName } from '../../../../hooks'
import { HotelTotalCostContainer } from '.'
import { OptionSelect } from '../multipleOrSingle'
import { IHotelPrice } from '../../../../interfaces'
import { Icon } from '@iconify/react'

interface HotelSummaryRowProps {
  nights: number
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const HotelSummaryRow = ({
  nights,
  isOpen,
  setIsOpen
}: HotelSummaryRowProps) => {
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

  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    setSelectedHotelName(e.target.value as string)
  }

  const toggleBreakdown = () => {
    setIsOpen((prevState: boolean) => !prevState)
  }

  return (
    <tr className='dark:bg-[#a9ba9d] dark:text-black-50'>
      <td
        onClick={toggleBreakdown}
        className='cursor-pointer flex justify-center py-4'
      >
        <Icon
          icon={isOpen ? 'typcn:minus' : 'typcn:plus'}
          width='30'
          height='30'
        />
      </td>
      <td></td>
      <td className='py-4'>
        <OptionSelect
          options={hotels}
          value={hotelName || hotels[0].name}
          handleChange={handleChange}
        />
      </td>
      <td></td>
      <td></td>
      <HotelTotalCostContainer />
    </tr>
  )
}
