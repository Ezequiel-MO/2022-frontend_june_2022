import { Icon } from '@iconify/react'

interface ArrowIconProps {
  open: boolean
  date: string
  dateProp: string
  typeOfMeeting: string
  typeOfMeetingProp: string
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({
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
