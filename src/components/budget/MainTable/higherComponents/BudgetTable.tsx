import { useEffect } from 'react'
import { Table } from '@mui/material'
import { BudgetTableHead, DayRows } from '.'
import { HotelRows } from '../rows/hotel'
import { TotalBudgetCost } from '../../totals'
import { IDay } from '../../../../interfaces'
import { useContextBudget } from '../../context/BudgetContext'
import {
  UPDATE_TRANSFERS_IN_COST,
  UPDATE_TRANSFERS_OUT_COST
} from '../../context/budgetReducer'
import { GiftsRow } from '../rows/gift/GiftsRow'

export const BudgetTable = () => {
  const { state, dispatch } = useContextBudget()

  useEffect(() => {
    dispatch({
      type: UPDATE_TRANSFERS_IN_COST,
      payload: {
        transfer_in: state.schedule[0]?.transfer_in
      }
    })
    dispatch({
      type: UPDATE_TRANSFERS_OUT_COST,
      payload: {
        transfer_out: state.schedule?.[state.schedule.length - 1]?.transfer_out
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
        {state.schedule?.map((day: IDay, index: number) => (
          <DayRows
            key={day._id}
            day={day}
            pax={state.nrPax}
            isFirstDay={index === 0}
            isLastDay={index === state.schedule.length - 1}
          />
        ))}
        <GiftsRow nrPax={state.nrPax} />
        <TotalBudgetCost />
      </tbody>
    </Table>
  )
}
