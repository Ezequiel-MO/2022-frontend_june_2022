import { useEffect } from 'react'
import { Table } from '@mui/material'
import { BudgetTableHead, DayRows } from '.'
import { HotelRows } from '../hotel'
import { TotalBudgetCost } from '../../totals'
import { GiftsRow } from '../rows'
import { IDay, IHotel } from '../../../../interfaces'
import { useContextBudget } from '../../context/BudgetContext'
import {
  SET_BUDGET,
  UPDATE_TRANSFERS_IN_COST,
  UPDATE_TRANSFERS_OUT_COST
} from '../../context/budgetReducer'

interface Props {
  hotels: IHotel[]
  schedule: IDay[]
  nrPax: number
}

export const BudgetTable = ({ hotels, schedule, nrPax }: Props) => {
  const { state, dispatch } = useContextBudget()

  useEffect(() => {
    dispatch({
      type: SET_BUDGET,
      payload: {
        hotels,
        schedule,
        nrPax
      }
    })
    dispatch({
      type: UPDATE_TRANSFERS_IN_COST,
      payload: {
        transfer_in: schedule[0].transfer_in
      }
    })
    dispatch({
      type: UPDATE_TRANSFERS_OUT_COST,
      payload: {
        transfer_out: schedule[schedule.length - 1].transfer_out
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
        <HotelRows hotels={hotels} />
        {state.schedule?.map((day: IDay, index: number) => (
          <DayRows
            key={day._id}
            day={day}
            pax={nrPax}
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
