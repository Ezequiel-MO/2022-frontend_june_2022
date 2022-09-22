import { Typography } from '@mui/material'
import Paragraph from '../../ui/Paragraph'
import RenderPhotos from '../../ui/renderPhotos/RenderPhotos'

const MeetingCards = ({ meeting, hotelName, timing }) => {
  return (
    <div id={meeting._id}>
      <Typography variant='h5'>{`${timing} Hotel Meeting at ${hotelName}`}</Typography>
      <Paragraph textContent={meeting.introduction} />
      <RenderPhotos images={meeting.imageContentUrl} />
    </div>
  )
}

export default MeetingCards
