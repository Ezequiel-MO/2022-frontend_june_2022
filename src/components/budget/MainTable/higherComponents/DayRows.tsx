import { IDay } from '../../../../interfaces'

import {
  AfternoonSection,
  DinnerSection,
  LunchSection,
  MorningSection,
  TransfersInSection,
  TransfersOutSection
} from '../sections'

interface DayRowsProps {
  day: IDay
  pax: number
  isFirstDay: boolean
  isLastDay: boolean
}

export const DayRows = ({ day, pax, isFirstDay, isLastDay }: DayRowsProps) => {
  return (
    <>
      {isFirstDay && (
        <TransfersInSection transfers={day.transfer_in} date={day.date} />
      )}
      <MorningSection
        events={day.morningEvents.events}
        meetings={day.morningMeetings?.meetings || []}
        date={day.date}
        pax={pax}
      />
      <LunchSection lunch={day.lunch.restaurants} date={day.date} pax={pax} />
      <AfternoonSection
        events={day.afternoonEvents.events}
        meetings={day.afternoonMeetings?.meetings || []}
        fullDayMeetings={day.fullDayMeetings?.meetings || []}
        date={day.date}
        pax={pax}
      />
      <DinnerSection
        dinners={day.dinner.restaurants}
        date={day.date}
        pax={pax}
      />
      {isLastDay && (
        <TransfersOutSection transfers={day.transfer_out} date={day.date} />
      )}
    </>
  )
}
