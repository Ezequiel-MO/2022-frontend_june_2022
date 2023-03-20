import { Typography } from '@mui/material'
import RenderPhotos from '../../ui/renderPhotos/RenderPhotos'
import { RichParagraph } from '../atoms/RichParagraph'

export const EventCards = ({ event }) => {
  return (
    <div id={event._id}>
      <Typography variant='h5'>{event.name}</Typography>
      <RichParagraph text={event.textContent} />
      <RenderPhotos images={event.imageContentUrl} />
    </div>
  )
}
