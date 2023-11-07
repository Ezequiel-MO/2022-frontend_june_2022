import { useEffect, useState } from 'react'
import { useBudget } from './useBudget'
import { IBudgetState } from '../redux/features/budgetSlice'
import { useCurrentProject } from './useCurrentProject'
import { IProject } from '../interfaces'

type ITransfersDetails = {
  assistance?: number
  assistanceCost?: number
  meetGreet?: number
  meetGreetCost?: number
}

export const useGetTransferCosts = () => {
  const budget: IBudgetState = useBudget()
  const [transfersTotalCost, setTransfersTotalCost] = useState<number>(0)
  const [transferInCost, setTransferInCost] = useState<number>(0)
  const [transferOutCost, setTransferOutCost] = useState<number>(0)
  const { currentProject } = useCurrentProject() as { currentProject: IProject }
  const { schedule } = currentProject
  const { transfers, transfersIn = {}, transfersOut = {} } = budget

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

  useEffect(() => {
    setTransferInCost(schedule[0].transfer_in[0]?.transfer_in)
    setTransferOutCost(
      schedule[schedule.length - 1].transfer_out[0]?.transfer_out
    )
  }, [
    schedule[0].transfer_in[0]?.transfer_in,
    schedule[schedule.length - 1].transfer_out[0]?.transfer_out
  ])

  useEffect(() => {
    const totalTransferCost =
      transferInCost +
      transferOutCost +
      assistanceCostIn * assistanceIn +
      meetGreetCostIn * meetGreetIn +
      assistanceCostOut * assistanceOut +
      dispatchCost * dispatch

    setTransfersTotalCost(totalTransferCost)
  }, [transferInCost, transferOutCost])

  return {
    transfersTotalCost
  }
}
