import React, { useEffect } from 'react'
import { useBudget, useCurrentProject, useLocalStorageItem } from '../../hooks'
import { ISettings } from '../../interfaces/settings'

type TabListItem = {
  _id: string
  name: string
}

type TabItemProps = {
  tabListItem: TabListItem
  type: string
  index: number
  activeTab: number
  setActiveTab: (index: number) => void
}

export const TabItem: React.FC<TabItemProps> = ({
  tabListItem,
  type,
  index,
  activeTab,
  setActiveTab
}) => {
  const isActive = activeTab === index + 1
  const { currentProject } = useCurrentProject()
  const { clientCompany, hasExternalCorporateImage } = currentProject
  const { setSelectedHotelName } = useBudget()
  const item = useLocalStorageItem('settings', {}) as ISettings
  const primary = item?.colorPalette?.primary || '#ea5933'

  useEffect(() => {
    if (type === 'hotel' && isActive) {
      setSelectedHotelName(tabListItem.name)
    }
  }, [tabListItem, type, isActive])

  const colorPalette = hasExternalCorporateImage
    ? clientCompany[0].colorPalette[0]
    : primary

  const tabClasses = `
    text-lg font-bold uppercase px-4 py-2 shadow-sm leading-normal
    transition-all ease-in-out duration-300 transform focus:outline-none focus:shadow-outline
    md:px-5 md:py-3
  `

  const activeClasses = `
    text-black-50 bg-white-100
`

  const inactiveClasses = `
    text-black-50 dark:text-white-0 bg-transparent hover:bg-gray-50 hover:text-white-0 dark:hover:text-black-50
`

  return (
    <li id={tabListItem._id}>
      <a
        className={`${tabClasses} ${
          isActive ? activeClasses : inactiveClasses
        }`}
        style={{ backgroundColor: isActive ? colorPalette : undefined }}
        onClick={(e) => {
          e.preventDefault()
          setActiveTab(index + 1)
        }}
        href={`#tab${index + 1}`}
        role='tablist'
      >
        {tabListItem.name}
      </a>
    </li>
  )
}
