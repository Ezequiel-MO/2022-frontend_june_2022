import {
  AfternoonEventsRow,
  DayRow,
  DinnerRow,
  LunchRow,
  MeetingBreakdownRows,
  MeetingSummaryRow,
  MorningEventsRow,
  TransfersInRow,
  TransfersOutRow,
  VenueBreakdownRows,
  VenueSummaryRow
} from '../../'
import { AssistanceRow } from './transfers'

export const DayRows = ({ day, pax }) => {
  const {
    date,
    transfer_in,
    morningEvents,
    morningMeetings,
    lunch,
    afternoonEvents,
    afternoonMeetings,
    dinner,
    transfer_out,
    fullDayMeetings
  } = day

  return (
    <>
      {transfer_in.length > 0 && (
        <>
          {transfer_in[0].meetGreet > 0 ? (
            <DayRow
              pax={1}
              date={date}
              options={transfer_in}
              description='Meet & Greet @ Airport'
              id='meetGreet'
            />
          ) : null}
        </>
      )}
      <AssistanceRow items={transfer_in} date={date} />
      <TransfersInRow items={transfer_in} date={date} />
      <MorningEventsRow items={morningEvents} date={date} pax={pax} />

      {morningEvents.length > 0 && (
        <>
          {morningEvents[0].transfer.length > 0 && (
            <>
              {morningEvents[0].transfer[0].withAssistance === true ? (
                <DayRow
                  pax={morningEvents[0].transfer.length}
                  date={date}
                  options={morningEvents[0].transfer}
                  description='Assistance on Bus'
                  id='assistance'
                />
              ) : null}
              <DayRow
                pax={morningEvents[0].transfer.length}
                date={date}
                options={morningEvents[0].transfer}
                description='Transfer'
                id='transfer_morningEvents'
              />
            </>
          )}
        </>
      )}
      {morningMeetings.length > 0 && (
        <>
          <MeetingSummaryRow
            pax={pax}
            dateProp={date}
            typeOfMeetingProp='Morning Meeting'
            meetings={morningMeetings}
            id='morningMeetings'
          />
          <MeetingBreakdownRows
            pax={pax}
            dateProp={date}
            typeOfMeetingProp='Morning Meeting'
            meetings={morningMeetings}
          />
        </>
      )}
      <LunchRow items={lunch} pax={pax} date={date} />
      {lunch.length > 0 && (
        <>
          {lunch[0].transfer[0].withAssistance === true ? (
            <DayRow
              pax={lunch[0].transfer.length}
              date={date}
              options={lunch[0].transfer}
              description='Assistance on Bus'
              id='assistance'
            />
          ) : null}
          <DayRow
            pax={lunch[0].transfer.length}
            date={date}
            options={lunch[0].transfer}
            description={
              lunch[0].transfer[0].selectedService === 'dispo_4h'
                ? 'Transfer 4h at disposal'
                : 'Transfer'
            }
            id='transfer_lunch'
          />
        </>
      )}
      <AfternoonEventsRow items={afternoonEvents} date={date} pax={pax} />
      {afternoonEvents.length > 0 && (
        <>
          {afternoonEvents[0].transfer[0].withAssistance === true ? (
            <DayRow
              pax={afternoonEvents[0].transfer.length}
              date={date}
              options={afternoonEvents[0].transfer}
              description='Assistance on Bus'
              id='assistance'
            />
          ) : null}
          <DayRow
            pax={afternoonEvents[0].transfer.length}
            date={date}
            options={afternoonEvents[0].transfer}
            description='Transfer'
            id='transfer_afternoonEvents'
          />
        </>
      )}
      {afternoonMeetings.length > 0 && (
        <>
          <MeetingSummaryRow
            pax={pax}
            dateProp={date}
            typeOfMeetingProp='Afternoon Meeting'
            meetings={afternoonMeetings}
            id='afternoonMeetings'
          />
          <MeetingBreakdownRows
            pax={pax}
            dateProp={date}
            typeOfMeetingProp='Afternoon Meeting'
            meetings={afternoonMeetings}
          />
        </>
      )}
      {fullDayMeetings.length > 0 && (
        <>
          <MeetingSummaryRow
            pax={pax}
            dateProp={date}
            typeOfMeetingProp='Full Day Meeting'
            meetings={fullDayMeetings}
            id='fullDayMeetings'
          />
          <MeetingBreakdownRows
            pax={pax}
            dateProp={date}
            typeOfMeetingProp='Full Day Meeting'
            meetings={fullDayMeetings}
          />
        </>
      )}
      {dinner.length > 0 && (
        <>
          {dinner[0].transfer[0]?.withAssistance === true ? (
            <DayRow
              pax={dinner[0].transfer.length}
              date={date}
              options={dinner[0].transfer}
              description='Assistance on Bus'
              id='assistance'
            />
          ) : null}
          <DayRow
            pax={dinner[0].transfer.length}
            date={date}
            options={dinner[0].transfer}
            description={
              dinner[0].transfer[0]?.selectedService === 'dispo_'
                ? 'Transfer 4h at disposal night hours'
                : 'Transfer'
            }
            id='transfer_dinner'
          />
          {dinner[0].isVenue ? (
            <>
              <VenueSummaryRow
                venues={dinner}
                pax={pax}
                dateProp={date}
                typeOfMeetingProp='Dinner Venue'
                id='dinner'
              />
              <VenueBreakdownRows
                venues={dinner}
                dateProp={date}
                typeOfMeetingProp='Dinner Venue'
              />
            </>
          ) : (
            <DinnerRow items={dinner} date={date} pax={pax} />
          )}
        </>
      )}
      <TransfersOutRow items={transfer_out} date={date} />
      {transfer_out.length > 0 && (
        <>
          {transfer_out[0].meetGreet > 0 ? (
            <DayRow
              pax={1}
              date={date}
              options={transfer_out}
              description='Bus dispatcher'
              id='meetGreet'
            />
          ) : null}
          {transfer_out[0].assistance > 0 ? (
            <DayRow
              pax={transfer_out.length}
              date={date}
              options={transfer_out}
              description='Assistant on bus'
              id='assistance'
            />
          ) : null}
        </>
      )}
    </>
  )
}
