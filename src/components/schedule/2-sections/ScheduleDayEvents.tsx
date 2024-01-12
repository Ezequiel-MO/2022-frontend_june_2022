import { IEvent } from '../../../interfaces'
import { RichParagraph } from '../../atoms/RichParagraph'
import { Events } from '../3-cardswrappers/Events'
import * as styles from '../../../constants/styles/mainsection'
import { Icon } from '@iconify/react'

interface Props {
  id: string
  title: string
  events: IEvent[]
  suplementaryText: boolean
  introduction: string
}

export const ScheduleDayEvents = ({
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
    <div id={id} className='page-break-after'>
      <div className='flex items-center'>
        <Icon icon='ion:ticket-outline' className='text-2xl mr-2' />
        <h1 className={styles.h1Title}>{title}</h1>
      </div>
      <RichParagraph text={introduction} />
      <Events events={events} />
    </div>
  )
}
