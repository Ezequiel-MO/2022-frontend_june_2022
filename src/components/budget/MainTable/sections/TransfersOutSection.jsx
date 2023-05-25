import {
  DispatchRow,
  TransfersOutAssistanceRow,
  TransfersOutRow
} from '../rows'

export const TransfersOutSection = ({ transfers, date }) => {
  return (
    <>
      <DispatchRow items={transfers} date={date} />
      <TransfersOutAssistanceRow items={transfers} date={date} />
      <TransfersOutRow items={transfers} date={date} />
    </>
  )
}
