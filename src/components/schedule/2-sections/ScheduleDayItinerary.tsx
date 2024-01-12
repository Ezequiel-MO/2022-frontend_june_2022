import { Icon } from '@iconify/react'
import { h1Title } from '../../../constants/styles/mainsection'
import { RichParagraph } from '../../atoms/RichParagraph'
interface Props {
  id: string
  introduction: string
}

export const ScheduleDayItinerary = ({ id, introduction }: Props) => {
  return (
    <div id={id} className='page-break-after'>
      <div className='flex items-center'>
        <Icon icon='tdesign:vehicle' className='text-2xl mr-2' />
        <h1 className={h1Title}>Itinerary - Transfer Details</h1>
      </div>
      <RichParagraph text={introduction} />
    </div>
  )
}
