import { useEffect, useState } from 'react'
import { useBudget } from './useBudget'

export const useGetTransferCosts = () => {
  const { transfers, transfersIn } = useBudget()
  const [transfersTotalCost, setTransfersTotalCost] = useState(0)
  const {
    assistance = 0,
    assistanceCost = 0,
    meetGreet = 0,
    meetGreetCost = 0
  } = transfersIn

  useEffect(() => {
    const transfersArray = Object.values(transfers)
    const totalCost = transfersArray.reduce((a, b) => a + b, 0)
    setTransfersTotalCost(
      totalCost + assistanceCost * assistance + meetGreetCost * meetGreet
    )
  }, [transfers])
  return {
    transfersTotalCost
  }
}
