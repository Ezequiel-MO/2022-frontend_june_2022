import { FC } from 'react'
import { useCurrentProject } from '../../hooks'
import { SidebarRow } from '.'
import { IProject } from '../../interfaces'

const Sidebar: FC = () => {
  const { currentProject } = useCurrentProject() as { currentProject: IProject }
  const { schedule, budget, hotels } = currentProject

  return (
    <div className='col-span-2 relative bg-white-0 dark:bg-black-50'>
      <div className='flex flex-col items-center px-4 md:items-start sticky top-20'>
        {hotels && hotels.length > 0 && (
          <SidebarRow iconText='bx:hotel' title='hotels' />
        )}
        {schedule?.map((day) => (
          <div key={day._id}>
            <SidebarRow iconText='akar-icons:calendar' title={day.date} />
          </div>
        ))}
        {budget === 'budget' ? (
          <SidebarRow iconText='ri:money-euro-circle-line' title='budget' />
        ) : null}
      </div>
    </div>
  )
}

export default Sidebar
