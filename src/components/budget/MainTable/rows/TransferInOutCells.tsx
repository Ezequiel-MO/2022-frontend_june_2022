import accounting from 'accounting'

interface Props {
  date: string
  description: string
  options: any
  pax: number
  id: 'meetGreet' | 'assistance' | 'transfer_in' | 'transfer_out'
}

export const TransferInOutCells = ({
  date,
  description,
  options,
  pax,
  id
}: Props) => {
  const isAssistance = id === 'assistance'
  const cost = isAssistance ? options[0].assistanceCost : options[0][id]
  const total = isAssistance
    ? options[0].assistance * options[0].assistanceCost
    : cost * pax

  return (
    <>
      <td>{description}</td>
      <td>{isAssistance && 'On Board Assistance'}</td>
      <td>{isAssistance ? options[0].assistance : pax}</td>
      <td>{accounting.formatMoney(cost, '€')}</td>
      <td>{accounting.formatMoney(total, '€')}</td>
    </>
  )
}
