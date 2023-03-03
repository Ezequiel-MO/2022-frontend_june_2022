import { forwardRef } from 'react'
import { BudgetContainer, BudgetTable } from './'
import { useBudgetData } from '../../hooks'

const Budget = forwardRef((props, ref) => {
  const { hotels, schedule, nrPax } = useBudgetData()
  return (
    <BudgetContainer ref={ref}>
      <BudgetTable hotels={hotels} schedule={schedule} nrPax={nrPax} />
    </BudgetContainer>
  )
})

export default Budget
