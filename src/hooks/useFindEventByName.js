import { useState, useEffect } from 'react'

export const useFindEventByName = (options, name) => {
  const [option, setOption] = useState(options[0])

  useEffect(() => {
    const foundOption = options.find((option) => option.name === name)
    if (foundOption) {
      setOption(foundOption)
    }
  }, [name, options])
  return { option }
}
