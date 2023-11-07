import { FC, useEffect, useState } from 'react'
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
    } else {
      setNrPax(pax)
    }
  }, [option])

  useHandleEffectById(id, date, option, setCurrentMeals, setCurrentEvents)
  useUpdateEventTotalCost(id, date, nrPax, option, updateEventTotalCost)

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValue(e.target.value as string)
  }

  return (
    <>
      <td>{`${description} options`}</td>
      <td>
        <OptionSelect
          options={options}
          value={selectedValue}
          handleChange={handleSelectChange}
        />
      </td>
      <td>{nrPax}</td>
      <td>{accounting.formatMoney(Number(option?.price), '€')}</td>
      <td>
        {accounting.formatMoney(Number(nrPax * Number(option?.price)), '€')}
      </td>
    </>
  )
}
