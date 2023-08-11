import { IRestaurant } from '../../../../interfaces'
import { LunchRow } from '../rows'
import { AssistanceEventTransferRow, EventTransferRow } from '../transfers'

interface LunchSectionProps {
  lunch: IRestaurant[]
  date: string
  pax: number
}

export const LunchSection = ({ lunch, date, pax }: LunchSectionProps) => (
  <>
    {lunch.length > 0 && lunch[0].transfer && (
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
