import { useState, useEffect } from 'react'
import { TableCell } from '@mui/material'
import { accounting } from 'accounting'
import { useBudget } from '../../../../hooks/useBudget'

export const SingleChoiceCells = ({ pax, options, description, date, id }) => {
  const [pricePerPerson, setPricePerPerson] = useState(true)
  const { updateEventTotalCost, setCurrentEvents, setCurrentMeals } =
    useBudget()

  useEffect(() => {
    if (id === 'lunch' || id === 'dinner') {
      setCurrentMeals(date, id, options[0]._id)
    }
    if (id === 'morningEvents' || id === 'afternoonEvents') {
      setCurrentEvents(date, id, options[0]._id)
      if (options[0].pricePerPerson === false) {
        setPricePerPerson(false)
      }
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
      <TableCell>{pricePerPerson ? pax : 1}</TableCell>
      <TableCell>{accounting.formatMoney(options[0].price, '€')}</TableCell>
      <TableCell>{accounting.formatMoney(options[0].totalCost, '€')}</TableCell>
    </>
  )
}
