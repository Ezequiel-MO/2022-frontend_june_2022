import { useEffect } from 'react'
import { TableCell } from '@mui/material'
import { accounting } from 'accounting'
import { useBudget } from '../../../../hooks/useBudget'

const SingleChoiceCells = ({ pax, options, description, date, id }) => {
  const { updateEventTotalCost, setCurrentEvents, setCurrentMeals } =
    useBudget()

  useEffect(() => {
    if (id === 'lunch' || id === 'dinner') {
      setCurrentMeals(date, id, options[0]._id)
    }
    if (id === 'morningEvents' || id === 'afternoonEvents') {
      setCurrentEvents(date, id, options[0]._id)
    }
  }, [options[0], id])

  useEffect(() => {
    if (
      id === 'morningEvents' ||
      id === 'afternoonEvents' ||
      id === 'lunch' ||
      id === 'dinner'
    ) {
      updateEventTotalCost(date, id, pax, options[0]._id)
    }
  }, [id])

  return (
    <>
      <TableCell>{description}</TableCell>
      <TableCell>{options[0].name}</TableCell>
      <TableCell>{pax}</TableCell>
      <TableCell>{accounting.formatMoney(options[0].price, '€')}</TableCell>
      <TableCell>{accounting.formatMoney(options[0].totalCost, '€')}</TableCell>
    </>
  )
}

export default SingleChoiceCells
