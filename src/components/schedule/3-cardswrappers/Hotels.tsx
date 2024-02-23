import { HotelCards } from '../4-cards/HotelCards'
import { IHotel } from '../../../interfaces'
import TabbedContent from '../../molecules/tabs/TabbedContent'

interface Props {
  hotels: IHotel[] | []
}

export const Hotels = ({ hotels }: Props) => {
  return (
    <div className='flex flex-wrap page-break-after' id='hotels_id'>
      <TabbedContent
        items={hotels}
        renderItem={(hotel) => <HotelCards hotel={hotel} />}
        type='hotel'
      />
    </div>
  )
}
