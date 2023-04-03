import { MeetGreetAssistanceRow, TransferRow } from '../rows'

export const TransportationServicesRow = ({
  pax,
  date,
  options,
  description,
  id
}) => {
  const props = {
    pax,
    description,
    options,
    id,
    date
  }

  if (id === 'meetGreet' || id === 'assistance') {
    return <MeetGreetAssistanceRow {...props} />
  }

  if (
    id.startsWith('transfer') &&
    id !== 'transfer_in' &&
    id !== 'transfer_out'
  ) {
    return <TransferRow {...props} />
  }

  return null
}
