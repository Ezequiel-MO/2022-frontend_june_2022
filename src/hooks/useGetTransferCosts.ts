import { useEffect, useState } from 'react'
import { useBudget } from './useBudget'
import { IBudgetState } from '../redux/features/budgetSlice'

type ITransfersDetails = {
  assistance?: number
  assistanceCost?: number
  meetGreet?: number
  meetGreetCost?: number
}

export const useGetTransferCosts = () => {
  const budget: IBudgetState = useBudget()
  const [transfersTotalCost, setTransfersTotalCost] = useState<number>(0)

  useEffect(() => {
    const { transfers, transfersIn = {}, transfersOut = {} } = budget
    const transfersArray: number[] = Object.values(transfers)
    const {
      assistance: assistanceIn = 0,
      assistanceCost: assistanceCostIn = 0,
      meetGreet: meetGreetIn = 0,
      meetGreetCost: meetGreetCostIn = 0
    }: ITransfersDetails = transfersIn

    const {
      assistance: assistanceOut = 0,
      assistanceCost: assistanceCostOut = 0,
      meetGreet: dispatch = 0,
      meetGreetCost: dispatchCost = 0
    }: ITransfersDetails = transfersOut

    const transferInOutTotalCost = transfersArray.reduce((a, b) => a + b, 0)

    const totalTransferCost =
      transferInOutTotalCost +
      assistanceCostIn * assistanceIn +
      meetGreetCostIn * meetGreetIn +
      assistanceCostOut * assistanceOut +
      dispatchCost * dispatch

    setTransfersTotalCost(totalTransferCost)
  }, [budget.transfers, budget.transfersIn, budget.transfersOut])

  return {
    transfersTotalCost
  }
}
