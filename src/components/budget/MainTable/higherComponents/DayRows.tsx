import { IDay } from '../../../../interfaces'
import { HotelRows } from '../rows/hotel'

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
  multiDestination: boolean
}

export const DayRows = ({
  day,
  pax,
  isFirstDay,
  isLastDay,
  multiDestination
}: DayRowsProps) => {
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
        multiDestination={multiDestination}
      />
      <LunchSection lunch={day.lunch?.restaurants} date={day.date} pax={pax} />
      <AfternoonSection
        events={day.afternoonEvents?.events}
        meetings={day.afternoonMeetings?.meetings || []}
        fullDayMeetings={day.fullDayMeetings?.meetings || []}
        date={day.date}
        pax={pax}
        multiDestination={multiDestination}
      />
      <DinnerSection
        dinners={day.dinner?.restaurants}
        date={day.date}
        pax={pax}
      />
      {isLastDay && (
        <TransfersOutSection transfers={day.transfer_out} date={day.date} />
      )}
    </>
  )
}
