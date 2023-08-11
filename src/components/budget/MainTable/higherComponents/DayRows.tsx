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
  const { date } = day

  return (
    <>
      <TransfersInSection transfers={day.transfer_in} date={date} />
      <MorningSection
        events={day.morningEvents.events}
        meetings={day.morningMeetings.meetings}
        date={date}
        pax={pax}
      />
      <LunchSection lunch={day.lunch.restaurants} date={date} pax={pax} />
      <AfternoonSection
        events={day.afternoonEvents.events}
        meetings={day.afternoonMeetings.meetings}
        fullDayMeetings={day.fullDayMeetings.meetings}
        date={date}
        pax={pax}
      />
      <DinnerSection dinner={day.dinner.restaurants} date={date} pax={pax} />
      <TransfersOutSection transfers={day.transfer_out} date={date} />
    </>
  )
}
