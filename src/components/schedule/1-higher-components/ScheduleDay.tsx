import { IDay } from '../../../interfaces'
import { DateHeader } from './ScheduleDayDateHeader'
import * as styles from '../../../constants/styles/mainsection'
import { useScheduleFilter } from '../useScheduleFilter'
import DayContentRenderer from './DayContentRenderer'

interface Props {
  day: IDay
  index: number
  suplementaryText: boolean
  arrivalDay: string
}

export const ScheduleDay = ({
  day,
  index,
  suplementaryText,
  arrivalDay
}: Props) => {
  const itemsToRender = useScheduleFilter(day)

  return (
    <div className='mb-8 last:mb-0'>
      <div className={styles.dayPage} id={`${day.date}_id`}>
        <DateHeader date={day.date} index={index} arrivalDay={arrivalDay} />
        <DayContentRenderer
          items={itemsToRender}
          day={day}
          suplementaryText={suplementaryText}
        />
      </div>

      <hr className={styles.pageBottomBorder} />
    </div>
  )
}
