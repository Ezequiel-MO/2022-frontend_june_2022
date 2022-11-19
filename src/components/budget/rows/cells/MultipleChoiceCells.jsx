import { useState, useEffect } from 'react'
import { accounting } from 'accounting'
import { TableCell } from '@mui/material'
import MultipleChoice from '../days/MultipleChoice'
import { useBudget } from '../../../../hooks/useBudget'
import useFindEventByName from '../../../../hooks/useFindEventByName'

const MultipleChoiceCells = ({ pax, description, options, id, date }) => {
  const { updateEventTotalCost, setCurrentMeals } = useBudget()
  const [value, setValue] = useState(options[0].name)

  const { option } = useFindEventByName(options, value)

  useEffect(() => {
    if (id === 'lunch' || id === 'dinner') {
      setCurrentMeals(date, id, option._id)
    }
  }, [option, id])

  useEffect(() => {
    if (
      id === 'morningEvents' ||
      id === 'afternoonEvents' ||
      id === 'lunch' ||
      id === 'dinner'
    ) {
      updateEventTotalCost(date, id, pax, option._id)
    }
  }, [value])

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <>
      <TableCell>{`${description} options`}</TableCell>
      <TableCell>
        <MultipleChoice
          options={options}
          value={value}
          handleChange={handleChange}
          id={id}
        />
      </TableCell>
      <TableCell>{pax}</TableCell>
      <TableCell>{accounting.formatMoney(option.price, '€')}</TableCell>
      <TableCell>{accounting.formatMoney(option.totalCost, '€')}</TableCell>
    </>
  )
}

export default MultipleChoiceCells
