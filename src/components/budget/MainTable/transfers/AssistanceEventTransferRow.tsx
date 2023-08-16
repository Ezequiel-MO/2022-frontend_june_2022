import { ITransfer } from '../../../../interfaces'
import { TransportationServicesRow } from './TransportationServicesRow'

interface Props {
  transfer: ITransfer[]
  date: string
}

export const AssistanceEventTransferRow = ({ transfer, date }: Props) =>
  transfer[0]?.assistance > 0 ? (
    <TransportationServicesRow
      pax={transfer.length}
      date={date}
      options={transfer}
      description='Assistance on Bus'
      id='assistance'
    />
  ) : null
