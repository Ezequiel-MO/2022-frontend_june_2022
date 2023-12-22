import RenderPhotos from '../organisms/RenderPhotos'
import { RichParagraph } from '../atoms/RichParagraph'
import { IEvent } from '../../interfaces'

interface Props {
  event: IEvent
}

export const EventCards = ({ event }: Props) => {
  return (
    <div
      id={event._id}
      className='p-4 bg-white-0 dark:bg-black-50 shadow-md rounded-lg'
    >
      <h5 className='text-lg font-semibold mb-2'>{event.name}</h5>
      <RichParagraph text={event.textContent || ''} />
      <RenderPhotos images={event.imageContentUrl ?? []} />
    </div>
  )
}
