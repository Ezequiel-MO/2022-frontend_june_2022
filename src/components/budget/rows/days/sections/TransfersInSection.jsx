import {
  MeetGreetRow,
  TransfersInAssistanceRow,
  TransfersInRow
} from '../../cells'

export const TransfersInSection = ({ transfers, date }) => (
  <>
    <MeetGreetRow items={transfers} date={date} />
    <TransfersInAssistanceRow items={transfers} date={date} />
    <TransfersInRow items={transfers} date={date} />
  </>
)
