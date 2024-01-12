import { Icon } from '@iconify/react'
import { IHotel } from '../../../interfaces'
import { RichParagraph } from '../../atoms/RichParagraph'
import { Hotels } from '../../hotels/Hotels'
import { h1Title } from '../../../constants/styles/mainsection'

interface Props {
  id: string
  introduction: string
  overnight: IHotel[]
}

export const ScheduleDayOvernight = ({
  id,
  introduction,
  overnight
}: Props) => {
  return (
    <div id={id} className='page-break-after'>
      <div className='flex items-center'>
        <Icon
          icon='icon-park-outline:hotel-please-clean'
          className='text-2xl mr-2'
        />
        <h1 className={h1Title}>Accommodation options</h1>
      </div>
      <RichParagraph text={introduction} />
      <Hotels hotels={overnight} />
    </div>
  )
}
