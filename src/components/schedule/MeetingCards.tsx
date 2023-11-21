import { Typography } from '@mui/material'
import RenderPhotos from '../organisms/RenderPhotos'
import { RichParagraph } from '../atoms/RichParagraph'
import { IMeeting } from '../../interfaces'
import { useContextBudget } from '../budget/context/BudgetContext'

interface Props {
  meeting: IMeeting
  timing: string
}

export const MeetingCards = ({ meeting, timing }: Props) => {
  const { state } = useContextBudget()
  if (meeting?.hotelName! === state.selectedHotel?.name) return
  return (
    <div id={meeting._id}>
      <Typography variant='h5'>{`${timing} Hotel Meeting at ${state.selectedHotel?.name}`}</Typography>
      <RichParagraph text={meeting.introduction} />
      <RenderPhotos
        images={state.selectedHotel?.meetingImageContentUrl ?? []}
      />
    </div>
  )
}
