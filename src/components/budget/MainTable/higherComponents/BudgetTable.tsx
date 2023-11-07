import { useEffect } from 'react'
import { Table } from '@mui/material'
import { BudgetTableHead, DayRows } from '.'
import { HotelRows } from '../hotel'
import { TotalBudgetCost } from '../../totals'
import { GiftsRow } from '../rows'
import { useCurrentProject } from '../../../../hooks'
import { IDay, IHotel } from '../../../../interfaces'
import { useContextBudget } from '../../context/BudgetContext'
import { SET_BUDGET } from '../../context/budgetReducer'

export const BudgetTable = () => {
  const { currentProject } = useCurrentProject()
  const { state, dispatch } = useContextBudget()
  const { hotels, schedule, nrPax } = currentProject as {
    hotels: IHotel[]
    schedule: IDay[]
    nrPax: number
  }

  useEffect(() => {
    dispatch({
      type: SET_BUDGET,
      payload: {
        hotels,
        schedule,
        nrPax
      }
    })
  }, [dispatch])

  return (
    <Table
      id='budget-table'
      stickyHeader
      size='small'
      className='main-table text-left divide-y divide-gray-700 dark:divide-black-50 dark:bg-gray-50 text-sm'
    >
      <BudgetTableHead />
      <tbody>
        <HotelRows hotels={state.hotels} />
        {state.schedule?.map((day) => (
          <DayRows key={day._id} day={day} pax={nrPax} />
        ))}
        <GiftsRow nrPax={state.nrPax} />
        <TotalBudgetCost />
      </tbody>
    </Table>
  )
}
