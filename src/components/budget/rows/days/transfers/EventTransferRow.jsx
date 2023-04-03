import { DayRow } from '../DayRow'

export const EventTransferRow = ({ transfer, date, id, description }) => (
  <DayRow
    pax={transfer.length}
    date={date}
    options={transfer}
    description={description}
    id={id}
  />
)
