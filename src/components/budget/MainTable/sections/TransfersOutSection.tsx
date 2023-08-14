import { ITransfer } from '../../../../interfaces'
import {
  DispatchRow,
  TransfersOutAssistanceRow,
  TransfersOutRow
} from '../rows'

interface TransfersOutSectionProps {
  transfers: ITransfer[]
  date: string
}

export const TransfersOutSection = ({
  transfers,
  date
}: TransfersOutSectionProps) => {
  return (
    <>
      <DispatchRow firstItem={transfers[0]} date={date} />
      <TransfersOutAssistanceRow firstItem={transfers[0]} date={date} />
      <TransfersOutRow items={transfers} date={date} />
    </>
  )
}
