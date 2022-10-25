import MeetingBreakdownRows from '../meeting/MeetingBreakdownRows'
import MeetingSummaryRow from '../meeting/MeetingSummaryRow'
import VenueBreakdownRows from '../venue/VenueBreakdownRows'
import VenueSummaryRow from '../venue/VenueSummaryRow'
import DayRow from './DayRow'

const DayRows = ({ day, pax }) => {
  const {
    date,
    transfer_in,
    morningEvents,
    morningMeetings,
    lunch,
    afternoonEvents,
    dinner,
    transfer_out
  } = day
  return (
    <>
      {transfer_in.length > 0 && (
        <DayRow
          pax={transfer_in.length}
          date={date}
          options={transfer_in}
          description='Transfer starting @ Airport'
          id='transfer_in'
        />
      )}
      {morningEvents.length > 0 && (
        <>
          {morningEvents[0].transfer.length > 0 && (
            <DayRow
              pax={morningEvents[0].transfer.length}
              date={date}
              options={morningEvents[0].transfer}
              description='Transfer'
              id='transfer'
            />
          )}
          <DayRow
            pax={pax}
            date={date}
            options={morningEvents}
            description='Morning Events'
            multipleChoice={`${morningEvents.length > 1}`}
            id='morningEvents'
          />
        </>
      )}
      {morningMeetings.length > 0 && (
        <>
          <MeetingSummaryRow
            pax={pax}
            date={date}
            typeOfMeeting='Morning Meeting'
            options={morningMeetings}
          />
          <MeetingBreakdownRows pax={pax} />
        </>
      )}

      {lunch.length > 0 && (
        <>
          <DayRow
            pax={lunch[0].transfer.length}
            date={date}
            options={lunch[0].transfer}
            description='Transfer'
            id='transfer'
          />
          <DayRow
            pax={pax}
            date={date}
            options={lunch}
            description={
              lunch[0].transfer[0].selectedService === 'dispo_4h'
                ? 'Transfer 4h at disposal'
                : 'Transfer'
            }
            multipleChoice={`${lunch.length > 1}`}
            id='lunch'
          />
        </>
      )}
      {afternoonEvents.length > 0 && (
        <>
          <DayRow
            pax={afternoonEvents[0].transfer.length}
            date={date}
            options={afternoonEvents[0].transfer}
            description='Transfer'
            id='transfer'
          />
          <DayRow
            pax={pax}
            date={date}
            options={afternoonEvents}
            description='Afternoon Events'
            multipleChoice={`${afternoonEvents.length > 1}`}
            id='afternoonEvents'
          />
        </>
      )}
      {dinner.length > 0 && (
        <>
          {console.log('DINNER', dinner[0].transfer[0]['selectedService'])}
          <DayRow
            pax={dinner[0].transfer.length}
            date={date}
            options={dinner[0].transfer}
            description={
              dinner[0].transfer[0].selectedService === 'dispo_4h_night'
                ? 'Transfer 4h at disposal night hours'
                : 'Transfer'
            }
            id='transfer'
          />
          {dinner[0].isVenue ? (
            <>
              <VenueSummaryRow options={dinner} pax={pax} />
              <VenueBreakdownRows options={dinner} />
            </>
          ) : (
            <DayRow
              pax={pax}
              date={date}
              options={dinner}
              description='Dinner Restaurants'
              multipleChoice={`${dinner.length > 1}`}
              id='dinner'
            />
          )}
        </>
      )}

      {transfer_out.length > 0 && (
        <DayRow
          pax={transfer_out.length}
          date={date}
          options={transfer_out}
          description='Hotel or City/Airport'
          id='transfer_out'
        />
      )}
    </>
  )
}

export default DayRows
