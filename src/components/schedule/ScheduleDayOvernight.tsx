import { IHotel } from '../../interfaces'
import { RichParagraph } from '../atoms/RichParagraph'
import { Hotels } from '../hotels/Hotels'

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
      <RichParagraph text={introduction} />
      <Hotels hotels={overnight} />
    </div>
  )
}
