import { ITransfer } from '../../../../interfaces'
import { TransportationServicesRow } from './TransportationServicesRow'

interface Props {
  transfer: ITransfer[]
  date: string
  id:
    | 'transfer_morningEvents'
    | 'transfer_afternoonEvents'
    | 'transfer_lunch'
    | 'transfer_dinner'
  description: string
}

export const EventTransferRow = ({
  transfer,
  date,
  id,
  description
}: Props) => (
  <TransportationServicesRow
    pax={transfer.length}
    date={date}
    options={transfer}
    description={description}
    id={id}
  />
)
