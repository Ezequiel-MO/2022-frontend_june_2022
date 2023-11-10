import { IEvent, IRestaurant, ITransfer } from '../../../../interfaces'
import { TransferRow } from '../rows'
import { AssistanceRow } from '../rows/AssistanceRow'

interface Props {
  transfer: ITransfer[]
  date: string
  id:
    | 'transfer_morningEvents'
    | 'transfer_afternoonEvents'
    | 'transfer_lunch'
    | 'transfer_dinner'
  selectedEvent: IEvent | IRestaurant
}

export const EventTransferRow = ({
  transfer = [],
  date,
  id,
  selectedEvent
}: Props) => {
  const transferIsNeeded =
    selectedEvent &&
    Array.isArray(selectedEvent.transfer) &&
    selectedEvent.transfer.length > 0

  if (!transferIsNeeded) return null

  const assistanceIsNeeded = transfer[0].assistance !== 0
  return (
    <>
      {assistanceIsNeeded && (
        <AssistanceRow
          firstItem={transfer[0]}
          date={date}
          description='On Board Assistance'
          id={id}
        />
      )}
      <TransferRow
        pax={transfer.length}
        date={date}
        options={transfer}
        description='Bus Service'
        id={id}
      />
    </>
  )
}
