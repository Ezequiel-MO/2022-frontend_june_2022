import { TransportationServicesRow } from './TransportationServicesRow'

export const AssistanceEventTransferRow = ({ transfer, date }) =>
  transfer[0]?.withAssistance ? (
    <TransportationServicesRow
      pax={transfer.length}
      date={date}
      options={transfer}
      description='Assistance on Bus'
      id='assistance'
    />
  ) : null
