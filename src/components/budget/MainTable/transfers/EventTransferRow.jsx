import { TransportationServicesRow } from './TransportationServicesRow'

export const EventTransferRow = ({ transfer, date, id, description }) => (
  <TransportationServicesRow
    pax={transfer.length}
    date={date}
    options={transfer}
    description={description}
    id={id}
  />
)
