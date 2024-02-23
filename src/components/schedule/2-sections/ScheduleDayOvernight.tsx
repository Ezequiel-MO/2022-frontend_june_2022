import { IHotel } from '../../../interfaces'
import { Hotels } from '../3-cardswrappers/Hotels'
import { ScheduleItemLayout } from './ScheduleItemLayout'

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
  if (overnight.length === 0) return null
  return (
    <ScheduleItemLayout
      id={id}
      icon='tabler:hotel-service'
      title={`Accommodation options`}
      introduction={introduction}
    >
      <Hotels hotels={overnight} />
    </ScheduleItemLayout>
  )
}
