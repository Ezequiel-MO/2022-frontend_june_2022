import { DayRow } from '../DayRow'

export const AssistanceEventTransferRow = ({ transfer, date }) =>
  transfer[0]?.withAssistance ? (
    <DayRow
      pax={transfer.length}
      date={date}
      options={transfer}
      description='Assistance on Bus'
      id='assistance'
    />
  ) : null
