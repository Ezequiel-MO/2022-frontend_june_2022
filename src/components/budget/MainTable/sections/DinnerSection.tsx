import { IRestaurant } from '../../../../interfaces'
import { DinnerRow } from '../rows'
import { AssistanceEventTransferRow, EventTransferRow } from '../transfers'
import { VenueBreakdownRows, VenueSummaryRow } from '../venue'

interface DinnerSectionProps {
  dinner: IRestaurant[]
  date: string
  pax: number
}

export const DinnerSection = ({ dinner, date, pax }: DinnerSectionProps) => (
  <>
    {dinner.length > 0 && dinner[0].transfer && (
      <>
        <AssistanceEventTransferRow transfer={dinner[0].transfer} date={date} />
        <EventTransferRow
          transfer={dinner[0].transfer}
          date={date}
          description={
            dinner[0].transfer[0]?.selectedService === 'dispo_'
              ? 'Transfer 4h at disposal night hours'
              : 'Transfer'
          }
          id='transfer_dinner'
        />
      </>
    )}
    {dinner[0]?.isVenue ? (
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
)
