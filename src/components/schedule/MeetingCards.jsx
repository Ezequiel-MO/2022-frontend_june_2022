import { Typography } from '@mui/material'
import RenderPhotos from '../../ui/renderPhotos/RenderPhotos'
import { RichParagraph } from '../atoms/RichParagraph'

export const MeetingCards = ({ meeting, hotelName, timing }) => {
  return (
    <div id={meeting._id}>
      <Typography variant='h5'>{`${timing} Hotel Meeting at ${hotelName}`}</Typography>
      <RichParagraph text={meeting.introduction} />
      <RenderPhotos images={meeting.imageContentUrl} />
    </div>
  )
}
