import { Icon } from '@iconify/react'

export const ArrowIcon = ({
  open,
  date,
  dateProp,
  typeOfMeeting,
  typeOfMeetingProp
}) => {
  const arrowIcon =
    open && date === dateProp && typeOfMeeting === typeOfMeetingProp
      ? 'bx:up-arrow'
      : 'bx:down-arrow'

  return <Icon icon={arrowIcon} color='#ea5933' />
}
