import { DayRow } from '../DayRow'
import { LunchRow } from '../meals/LunchRow'

export const LunchSection = ({ lunch, date, pax }) => (
  <>
    <LunchRow items={lunch} pax={pax} date={date} />
    {lunch.length > 0 && (
      <>
        {lunch[0].transfer[0]?.withAssistance === true ? (
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
            lunch[0].transfer[0]?.selectedService === 'dispo_4h'
              ? 'Transfer 4h at disposal'
              : 'Transfer'
          }
          id='transfer_lunch'
        />
      </>
    )}
  </>
)
