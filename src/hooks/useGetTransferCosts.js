import { useEffect, useState } from 'react'
import { useBudget } from './useBudget'

export const useGetTransferCosts = () => {
  const budget = useBudget()
  const [transfersTotalCost, setTransfersTotalCost] = useState(0)

  useEffect(() => {
    const { transfers, transfersIn = {}, transfersOut = {} } = budget
    const transfersArray = Object.values(transfers)
    const {
      assistance: assistanceIn = 0,
      assistanceCost: assistanceCostIn = 0,
      meetGreet: meetGreetIn = 0,
      meetGreetCost: meetGreetCostIn = 0
    } = transfersIn

    const {
      assistance: assistanceOut = 0,
      assistanceCost: assistanceCostOut = 0,
      meetGreet: dispatch = 0,
      meetGreetCost: dispatchCost = 0
    } = transfersOut

    const totalCost = transfersArray.reduce((a, b) => a + b, 0)

    const totalTransferCost =
      totalCost +
      assistanceCostIn * assistanceIn +
      meetGreetCostIn * meetGreetIn +
      assistanceCostOut * assistanceOut +
      dispatchCost * dispatch

    setTransfersTotalCost(totalTransferCost)
  }, [budget])
  return {
    transfersTotalCost
  }
}
