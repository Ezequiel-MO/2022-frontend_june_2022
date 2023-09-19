import { IRestaurant } from '../../../../interfaces'
import { DinnerRow } from '../rows'
import { AssistanceEventTransferRow, EventTransferRow } from '../transfers'
import { VenueBreakdownRows, VenueSummaryRow } from '../venue'

interface DinnerSectionProps {
  dinners: IRestaurant[]
  date: string
  pax: number
}

export const DinnerSection = ({ dinners, date, pax }: DinnerSectionProps) => (
  <>
    {dinners.length > 0 && dinners[0].transfer && (
      <>
        <AssistanceEventTransferRow
          transfer={dinners[0].transfer}
          date={date}
        />
        <EventTransferRow
          transfer={dinners[0].transfer}
          date={date}
          description={
            dinners[0].transfer[0]?.selectedService === 'dispo_'
              ? 'Transfer 4h at disposal night hours'
              : 'Transfer'
          }
          id='transfer_dinner'
        />
      </>
    )}
    {dinners[0]?.isVenue ? (
      <>
        <VenueSummaryRow
          venues={dinners}
          pax={pax}
          dateProp={date}
          typeOfMeetingProp='Dinner Venue'
          id='dinner'
        />
        <VenueBreakdownRows
          venues={dinners}
          dateProp={date}
          typeOfMeetingProp='Dinner Venue'
        />
      </>
    ) : (
      <DinnerRow items={dinners} date={date} pax={pax} />
    )}
  </>
)
