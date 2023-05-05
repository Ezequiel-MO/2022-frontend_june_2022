import { useEffect } from 'react'
import { useBudget, useCurrentProject } from '../../hooks'

export const TabItem = ({
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

  useEffect(() => {
    if (type === 'hotel' && isActive) {
      setSelectedHotelName(tabListItem.name)
    }
  }, [tabListItem, type, isActive])

  const colorPalette = hasExternalCorporateImage
    ? clientCompany[0].colorPalette[0]
    : '#EA5933'

  const tabClasses = `
    max-w-md text-sm font-bold uppercase px-5 py-3 shadow-sm rounded block leading-normal
    transition-all ease-in-out focus:outline-none focus:shadow-outline
  `

  const activeClasses = `
    text-white-100
  `

  const inactiveClasses = `
    bg-white-100 dark:bg-gray-50 dark:hover:text-black-50
  `

  return (
    <li className='m-1 last:mr-0' id={tabListItem._id}>
      <a
        className={`${tabClasses} ${
          isActive ? activeClasses : inactiveClasses
        }`}
        style={{
          backgroundColor: isActive ? colorPalette : undefined
        }}
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
