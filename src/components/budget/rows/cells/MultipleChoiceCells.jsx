import { useState, useEffect } from 'react'
import { TableCell } from '@mui/material'
import { MultipleChoice, TotalRow } from '../../'
import { useBudget, useFindByName } from '../../../../hooks'

export const MultipleChoiceCells = ({
  pax,
  description,
  options,
  id,
  date
}) => {
  const { updateEventTotalCost, setCurrentMeals, setCurrentEvents } =
    useBudget()
  const [value, setValue] = useState(options[0].name)

  const { selectedOption: option } = useFindByName(options, value)

  useEffect(() => {
    if (id === 'lunch' || id === 'dinner') {
      setCurrentMeals(date, id, option._id)
    }
    if (id === 'morningEvents' || id === 'afternoonEvents') {
      setCurrentEvents(date, id, option._id)
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
  }, [value, option])

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
      <TotalRow option={option} />
    </>
  )
}
