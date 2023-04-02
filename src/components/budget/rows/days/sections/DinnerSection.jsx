import { VenueBreakdownRows } from '../../venue/VenueBreakdownRows'
import { VenueSummaryRow } from '../../venue/VenueSummaryRow'
import { DayRow } from '../DayRow'
import { DinnerRow } from '../meals/DinnerRow'

export const DinnerSection = ({ dinner, date, pax }) => (
  <>
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
  </>
)
