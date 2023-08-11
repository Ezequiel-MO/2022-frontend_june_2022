import { useState, useEffect } from 'react'
import { IEvent, IHotel, IRestaurant } from '../interfaces'

type IOption = IHotel | IEvent | IRestaurant

interface UseFindByNameReturn {
  selectedOption?: IOption
  loading: boolean
}

export const useFindByName = (
  options: IOption[],
  name: string
): UseFindByNameReturn => {
  const [selectedOption, setSelectedOption] = useState<IOption | undefined>(
    options[0]
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundOption: IOption | undefined = options.find(
      (option) => option.name === name
    )
    if (foundOption) {
      setSelectedOption(foundOption)
    }
    setLoading(false)
  }, [name, options])

  return {
    selectedOption,
    loading
  }
}
