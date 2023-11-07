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
}

export const DayRows = ({ day, pax }: DayRowsProps) => {
  return (
    <>
      <TransfersInSection transfers={day.transfer_in} date={day.date} />
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
      <TransfersOutSection transfers={day.transfer_out} date={day.date} />
    </>
  )
}
