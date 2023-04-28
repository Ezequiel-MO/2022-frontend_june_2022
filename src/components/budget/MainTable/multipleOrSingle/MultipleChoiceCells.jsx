import { useState } from 'react'
import { TableCell } from '@mui/material'
import { useBudget, useFindByName } from '../../../../hooks'
import { OptionSelect } from './'
import { TotalRow } from '../../totals'
import { useUpdateEventTotalCost } from './useUpdateEventTotalCost'
import { useHandleEffectById } from './useHandleEffectById'

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

  useHandleEffectById(id, date, option, setCurrentMeals, setCurrentEvents)
  useUpdateEventTotalCost(id, date, pax, option, updateEventTotalCost)

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
