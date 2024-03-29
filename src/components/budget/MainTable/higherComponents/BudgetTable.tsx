import React, { useEffect } from 'react'
import { BudgetTableHead, DayRows } from '.'
import { HotelRows } from '../rows/hotel'
import { TotalBudgetCost } from '../../totals'
import { IDay } from '../../../../interfaces'
import {
  UPDATE_TRANSFERS_IN_COST,
  UPDATE_TRANSFERS_OUT_COST
} from '../../context/budgetReducer'
import { GiftsRow } from '../rows/gift/GiftsRow'
import { useCurrentProject } from '../../../../hooks'
import { OvernightRows } from '../rows/hotel/OvernightRows'
import { BudgetActions, BudgetState } from '../../context/interfaces'

interface Props {
  state: BudgetState
  dispatch: React.Dispatch<BudgetActions>
}

export const BudgetTable = ({ state, dispatch }: Props) => {
  const { currentProject } = useCurrentProject()
  const { multiDestination } = currentProject

  useEffect(() => {
    if (currentProject.schedule && currentProject.schedule.length > 0) {
      dispatch({
        type: UPDATE_TRANSFERS_IN_COST,
        payload: { transfer_in: currentProject.schedule[0]?.transfer_in }
      })
      dispatch({
        type: UPDATE_TRANSFERS_OUT_COST,
        payload: {
          transfer_out:
            currentProject.schedule[currentProject.schedule.length - 1]
              ?.transfer_out
        }
      })
    }
  }, [dispatch, currentProject.schedule])

  return (
    <table
      id='budget-table'
      className='min-w-full divide-y divide-gray-300 dark:divide-black-50 dark:bg-gray-50 text-sm'
    >
      <BudgetTableHead />
      <tbody className='divide-y divide-gray-300'>
        {!multiDestination && <HotelRows hotels={state.hotels} />}
        {state.schedule?.map((day: IDay, index: number) => (
          <React.Fragment key={day._id}>
            <DayRows
              day={day}
              pax={state.nrPax}
              isFirstDay={index === 0}
              isLastDay={index === state.schedule.length - 1}
              multiDestination={multiDestination}
            />
            {multiDestination && (
              <OvernightRows date={day.date} hotels={day.overnight?.hotels} />
            )}
          </React.Fragment>
        ))}
        <GiftsRow nrPax={state.nrPax} />
        <TotalBudgetCost />
      </tbody>
    </table>
  )
}
