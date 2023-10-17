import { useState } from 'react'
import { useActiveTab } from '../../../context/ActiveTabProvider'
import { useCurrentProject } from '../../../hooks'
import { SidebarSubtitles, SidebarTitles } from '..'
import { IProject } from '../../../interfaces'

interface Props {
  iconText: string
  title: string
  isSidebarVisible: boolean
}

export const SidebarRow = ({ iconText, title, isSidebarVisible }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { currentProject } = useCurrentProject() as { currentProject: IProject }
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
        isSidebarVisible={isSidebarVisible}
      />

      <SidebarSubtitles
        title={title}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        hotels={hotels}
        activeTab={activeTab}
        handleChange={handleChange}
        schedule={schedule}
        isSidebarVisible={isSidebarVisible}
      />
    </>
  )
}
