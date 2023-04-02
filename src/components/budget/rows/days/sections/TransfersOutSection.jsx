import {
  DispatchRow,
  TransfersOutAssistanceRow,
  TransfersOutRow
} from '../transfers'

export const TransfersOutSection = ({ transfers, date }) => (
  <>
    <DispatchRow items={transfers} date={date} />
    <TransfersOutAssistanceRow items={transfers} date={date} />
    <TransfersOutRow items={transfers} date={date} />
  </>
)
