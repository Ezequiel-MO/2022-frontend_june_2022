import { useEffect, useState } from 'react'
import { useBudget } from './useBudget'

export const useGetTransferCosts = () => {
  const { transfers } = useBudget()
  const [transfersTotalCost, setTransfersTotalCost] = useState(0)

  useEffect(() => {
    const transfersArray = Object.values(transfers)
    const totalCost = transfersArray.reduce((a, b) => a + b, 0)
    setTransfersTotalCost(totalCost)
  }, [transfers])
  return {
    transfersTotalCost
  }
}
