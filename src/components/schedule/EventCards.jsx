import { Typography } from '@mui/material'
import RenderPhotos from '../../ui/renderPhotos/RenderPhotos'
import ParagraphText from '../Text'

const EventCards = ({ event }) => {
  return (
    <div id={event._id}>
      <Typography variant='h5'>{event.name}</Typography>
      <ParagraphText text={JSON.parse(event.textContent)} />
      <RenderPhotos images={event.imageContentUrl} />
    </div>
  )
}

export default EventCards
