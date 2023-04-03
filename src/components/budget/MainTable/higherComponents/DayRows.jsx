import {
  AfternoonSection,
  DinnerSection,
  LunchSection,
  MorningSection,
  TransfersInSection,
  TransfersOutSection
} from '../sections'

export const DayRows = ({ day, pax }) => {
  const { date } = day

  return (
    <>
      <TransfersInSection transfers={day.transfer_in} date={date} />
      <MorningSection
        events={day.morningEvents}
        meetings={day.morningMeetings}
        date={date}
        pax={pax}
      />
      <LunchSection lunch={day.lunch} date={date} pax={pax} />
      <AfternoonSection
        events={day.afternoonEvents}
        meetings={day.afternoonMeetings}
        fullDayMeetings={day.fullDayMeetings}
        date={date}
        pax={pax}
      />
      <DinnerSection dinner={day.dinner} date={date} pax={pax} />
      <TransfersOutSection transfers={day.transfer_out} date={date} />
    </>
  )
}
