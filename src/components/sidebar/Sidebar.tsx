import { FC, useState } from 'react'
import { useCurrentProject } from '../../hooks'
import { SidebarRow } from '.'
import { IProject } from '../../interfaces'
import { checkDayIsEmpty } from '../../helpers/checkEmptyDay'

import { SidebarToggleButton } from '../atoms/SidebarToggleButton'

interface SidebarProps {
  isSticky?: boolean
}

const Sidebar: FC<SidebarProps> = ({ isSticky }) => {
  const stickyClass = isSticky ? 'sticky top-10' : ''
  const { currentProject } = useCurrentProject() as { currentProject: IProject }
  const { schedule, budget, hotels } = currentProject
  const [isSidebarVisible, setIsSidebarVisible] = useState(() => {
    const saved = localStorage.getItem('sidebarVisible')
    return saved ? JSON.parse(saved) : true
  })

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
    localStorage.setItem('sidebarVisible', JSON.stringify(!isSidebarVisible))
  }

  return (
    <div
      className={`flex flex-col fixed bg-white-0 dark:bg-black-50 ${stickyClass}`}
    >
      <div className='hidden lg:block'>
        <SidebarToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />
      </div>
      <div className='flex flex-col items-center px-4 md:items-start'>
        {hotels && hotels.length > 0 && (
          <SidebarRow
            iconText='bx:hotel'
            title='hotels'
            isSidebarVisible={isSidebarVisible}
          />
        )}
        {schedule?.map((day) => (
          <div key={day._id}>
            {checkDayIsEmpty(day) ? null : (
              <SidebarRow
                iconText='bx:calendar'
                title={day.date}
                isSidebarVisible={isSidebarVisible}
              />
            )}
          </div>
        ))}
        {budget === 'budget' || budget === 'budgetAsPdf' ? (
          <SidebarRow
            iconText='ri:money-euro-circle-line'
            title='budget'
            isSidebarVisible={isSidebarVisible}
          />
        ) : null}
      </div>
    </div>
  )
}

export default Sidebar
