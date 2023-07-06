import { useState, useEffect } from 'react'

export const useFindByName = (options, name) => {
  console.log('useFindByName', options, name)
  const [selectedOption, setSelectedOption] = useState(options[0])
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
