import { ReactNode, createContext, useContext, useState } from 'react'

interface ActiveTabContextType {
  setActiveTab: (index: number) => void
  activeTab: number
  change: boolean
  handleChange: (index: number) => void
}

const ActiveTabContext = createContext<ActiveTabContextType | undefined>(
  undefined
)

export const useActiveTab = (): ActiveTabContextType => {
  const context = useContext(ActiveTabContext)
  if (!context) {
    throw new Error(
      'useActiveTab must be used within an ActiveTabContextProvider'
    )
  }
  return context
}

interface ActiveTabContextProviderProps {
  children: ReactNode
}

export const ActiveTabContextProvider = ({
  children
}: ActiveTabContextProviderProps) => {
  const [activeTab, setActiveTab] = useState<number>(1)
  const [change, setChange] = useState<boolean>(false)

  const handleChange = (index: number): void => {
    setActiveTab(index)
    setChange(true)
    setTimeout(() => {
      setChange(false)
    }, 450)
  }

  return (
    <ActiveTabContext.Provider
      value={{ setActiveTab, activeTab, change, handleChange }}
    >
      {children}
    </ActiveTabContext.Provider>
  )
}
