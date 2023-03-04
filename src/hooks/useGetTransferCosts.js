import { useEffect, useState } from 'react'
import { useBudget } from './useBudget'

export const useGetTransferCosts = () => {
  const { transfers, transfersIn, transfersOut } = useBudget()
  const [transfersTotalCost, setTransfersTotalCost] = useState(0)
  const {
    assistance: assistance_in = 0,
    assistanceCost: assistanceCost_in = 0,
    meetGreet = 0,
    meetGreetCost = 0
  } = transfersIn

  const {
    assistance: assistance_out = 0,
    assistanceCost: assistanceCost_out = 0,
    meetGreet: dispatch = 0,
    meetGreetCost: dispatchCost = 0
  } = transfersOut

  useEffect(() => {
    const transfersArray = Object.values(transfers)
    const totalCost = transfersArray.reduce((a, b) => a + b, 0)
    setTransfersTotalCost(
      totalCost +
        assistanceCost_in * assistance_in +
        meetGreetCost * meetGreet +
        assistanceCost_out * assistance_out +
        dispatchCost * dispatch
    )
  }, [transfers])
  return {
    transfersTotalCost
  }
}
