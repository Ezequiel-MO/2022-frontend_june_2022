import RenderPhotos from '../../organisms/RenderPhotos'
import { RichParagraph } from '../../atoms/RichParagraph'
import { IEvent } from '../../../interfaces'

interface Props {
  event: IEvent
}

export const EventCard = ({ event }: Props) => {
  return (
    <div id={event._id} className='rounded-lg'>
      <RichParagraph text={event.textContent || ''} />
      <RenderPhotos images={event.imageContentUrl ?? []} />
    </div>
  )
}
