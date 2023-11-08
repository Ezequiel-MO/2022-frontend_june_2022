import { ITransfer } from '../../../../interfaces'
import { MeetGreetAssistanceRow, TransferRow } from '../rows'

interface Props {
  pax: number
  date: string
  options: ITransfer[]
  description: string
  id:
    | 'transfer_morningEvents'
    | 'transfer_afternoonEvents'
    | 'transfer_lunch'
    | 'transfer_dinner'
    | 'meetGreet'
    | 'assistance'
}

export const TransportationServicesRow = ({
  pax,
  date,
  options,
  description,
  id
}: Props) => {
  const props = {
    pax,
    date,
    description,
    options,
    id
  }

  if (id === 'meetGreet' || id === 'assistance') {
    return (
      <MeetGreetAssistanceRow
        pax={pax}
        date={date}
        description={description}
        options={options}
        id={id}
      />
    )
  }

  if (id.startsWith('transfer')) {
    return (
      <TransferRow
        pax={pax}
        date={date}
        options={options}
        description={description}
        id={id}
      />
    )
  }

  return null
}
