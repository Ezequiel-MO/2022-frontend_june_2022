import { useCurrentProject } from '../../hooks'
import { SidebarRow } from './'

const Sidebar = () => {
  const { currentProject } = useCurrentProject()
  const { schedule, hasBudget, hotels } = currentProject

  return (
    <div className='col-span-2 relative'>
      <div className='flex flex-col items-center px-4 md:items-start sticky top-20'>
        {hotels && hotels.length > 0 && (
          <SidebarRow iconText='bx:hotel' title='hotels' />
        )}
        {schedule?.map((day) => (
          <div key={day._id}>
            <SidebarRow iconText='akar-icons:calendar' title={day.date} />
          </div>
        ))}
        {hasBudget ? (
          <SidebarRow iconText='ri:money-euro-circle-line' title='budget' />
        ) : null}
      </div>
    </div>
  )
}

export default Sidebar
