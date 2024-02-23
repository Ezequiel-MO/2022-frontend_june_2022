import { IEvent } from '../../../interfaces'
import { Events } from '../3-cardswrappers/Events'
import * as styles from '../../../constants/styles/mainsection'
import { ScheduleItemLayout } from './ScheduleItemLayout'

interface Props {
  id: string
  title: string
  events: IEvent[]
  suplementaryText: boolean
  introduction: string
}

export const ScheduleDayActivities = ({
  id,
  title,
  events,
  suplementaryText,
  introduction
}: Props) => {
  if (!events.length) {
    return suplementaryText ? (
      <h3
        className={styles.supplemmentaryText}
      >{`No ${title.toLowerCase()} planned`}</h3>
    ) : null
  }
  return (
    <ScheduleItemLayout
      id={id}
      icon='ion:ticket-outline'
      title={`${title} options`}
      introduction={introduction}
    >
      <Events events={events} />
    </ScheduleItemLayout>
  )
}
