import { useState } from 'react'
import { useActiveTab } from '../../../context/ActiveTabProvider'
import { useCurrentProject } from '../../../hooks'
import { SidebarSubtitles, SidebarTitles } from '../'

export const SidebarRow = ({ iconText, title }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { currentProject } = useCurrentProject()
  const { hotels, schedule, clientCompany } = currentProject
  const { activeTab, handleChange } = useActiveTab()

  const { colorPalette = [] } = clientCompany[0] || {}
  return (
    <>
      <SidebarTitles
        iconText={iconText}
        title={title}
        colorPalette={colorPalette}
        setMenuOpen={setMenuOpen}
      />

      <SidebarSubtitles
        title={title}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        hotels={hotels}
        activeTab={activeTab}
        handleChange={handleChange}
        schedule={schedule}
      />
    </>
  )
}
