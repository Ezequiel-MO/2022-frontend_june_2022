import { useState, useEffect } from 'react'
import { TableCell } from '@mui/material'
import { useBudget, useFindByName } from '../../../../hooks'
import { OptionSelect } from './'
import { TotalRow } from '../../totals'

const handleEffectById = (
  id,
  date,
  option,
  setCurrentMeals,
  setCurrentEvents
) => {
  if (id === 'lunch' || id === 'dinner') {
    setCurrentMeals(date, id, option._id)
  }
  if (id === 'morningEvents' || id === 'afternoonEvents') {
    setCurrentEvents(date, id, option._id)
  }
}

export const MultipleChoiceCells = ({
  pax,
  description,
  options,
  id,
  date
}) => {
  const { updateEventTotalCost, setCurrentMeals, setCurrentEvents } =
    useBudget()
  const [selectedValue, setSelectedValue] = useState(options[0].name)

  const { selectedOption: option } = useFindByName(options, selectedValue)

  useEffect(() => {
    handleEffectById(id, date, option, setCurrentMeals, setCurrentEvents)
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
  }, [selectedValue, option])

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value)
  }

  return (
    <>
      <TableCell>{`${description} options`}</TableCell>
      <TableCell>
        <OptionSelect
          options={options}
          value={selectedValue}
          handleChange={handleSelectChange}
        />
      </TableCell>
      <TableCell>{pax}</TableCell>
      <TotalRow option={option} />
    </>
  )
}
