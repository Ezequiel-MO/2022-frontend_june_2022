import { LunchRow } from '../meals/LunchRow'
import { AssistanceEventTransferRow, EventTransferRow } from '../transfers'

export const LunchSection = ({ lunch, date, pax }) => (
  <>
    {lunch.length > 0 && (
      <>
        <AssistanceEventTransferRow transfer={lunch[0].transfer} date={date} />
        <EventTransferRow
          transfer={lunch[0].transfer}
          date={date}
          description={
            lunch[0].transfer[0]?.selectedService === 'dispo_4h'
              ? 'Transfer 4h at disposal'
              : 'Transfer'
          }
          id='transfer_lunch'
        />
      </>
    )}
    <LunchRow items={lunch} pax={pax} date={date} />
  </>
)
