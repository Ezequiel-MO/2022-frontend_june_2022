import { useState, useEffect } from 'react'

export const useFindByName = (options, name) => {
  const [selectedOption, setSelectedOption] = useState(options[0])

  useEffect(() => {
    const foundOption = options.find((option) => option.name === name)
    if (foundOption) {
      setSelectedOption(foundOption)
    }
  }, [name, options])

  return {
    selectedOption
  }
}
