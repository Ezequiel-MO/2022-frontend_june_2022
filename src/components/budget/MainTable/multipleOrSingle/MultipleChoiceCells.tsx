import { FC, useEffect, useState } from 'react'
import { TableCell } from '@mui/material'
import { useBudget, useFindByName } from '../../../../hooks'
import { OptionSelect } from '.'
import { useUpdateEventTotalCost } from './useUpdateEventTotalCost'
import { useHandleEffectById } from './useHandleEffectById'
import accounting from 'accounting'
import { IEvent, IRestaurant } from '../../../../interfaces'

interface MultipleChoiceCellsProps {
  pax: number
  description: string
  options: IEvent[] | IRestaurant[]
  id: 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner'
  date: string
}

export const MultipleChoiceCells: FC<MultipleChoiceCellsProps> = ({
  pax,
  description,
  options,
  id,
  date
}) => {
  const [nrPax, setNrPax] = useState(pax)
  const { updateEventTotalCost, setCurrentMeals, setCurrentEvents } =
    useBudget()
  const [selectedValue, setSelectedValue] = useState(options[0].name as string)

  const { selectedOption: option } = useFindByName(options, selectedValue) as {
    selectedOption: IEvent | IRestaurant
  }

  useEffect(() => {
    if (option && option._id) {
      updateEventTotalCost(date, id, nrPax, option._id)
    }
  }, [])

  useEffect(() => {
    if (
      option &&
      'pricePerPerson' in option &&
      option.pricePerPerson === false
    ) {
      setNrPax(1)
    }
  }, [option])

  useHandleEffectById(id, date, option, setCurrentMeals, setCurrentEvents)
  useUpdateEventTotalCost(id, date, nrPax, option, updateEventTotalCost)

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValue(e.target.value as string)
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
      <TableCell>{nrPax}</TableCell>
      <TableCell>
        {accounting.formatMoney(Number(option?.price), '€')}
      </TableCell>
      <TableCell>
        {accounting.formatMoney(Number(nrPax * Number(option?.price)), '€')}
      </TableCell>
    </>
  )
}
