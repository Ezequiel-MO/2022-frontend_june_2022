import { useState, useEffect } from 'react'
import { IHotel } from '../interfaces'

interface UseFindByNameReturn {
  selectedOption?: IHotel
  loading: boolean
}

export const useFindByName = (
  options: IHotel[],
  name: string
): UseFindByNameReturn => {
  const [selectedOption, setSelectedOption] = useState<IHotel | undefined>(
    options[0]
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundOption = options.find((option) => option.name === name)
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
