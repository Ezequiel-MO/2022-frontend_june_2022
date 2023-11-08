import { forwardRef } from 'react'
import { BudgetContainer, BudgetTable } from '.'
import { useCurrentProject } from '../../../../hooks'
import { IDay, IHotel } from '../../../../interfaces'

export const Budget = forwardRef<HTMLDivElement>((_, ref) => {
  const { currentProject } = useCurrentProject()
  const { hotels, schedule, nrPax } = currentProject as {
    hotels: IHotel[]
    schedule: IDay[]
    nrPax: number
  }
  return (
    <BudgetContainer ref={ref}>
      <BudgetTable hotels={hotels} schedule={schedule} nrPax={nrPax} />
    </BudgetContainer>
  )
})
