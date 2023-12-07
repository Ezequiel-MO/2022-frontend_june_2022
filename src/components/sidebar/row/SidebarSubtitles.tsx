import { HotelSubtitles, ScheduleSubtitles } from '..'
import { IDay, IHotel } from '../../../interfaces'

interface Props {
  title: string
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  hotels: IHotel[]
  activeTab: number
  handleChange: (newTab: number) => void
  schedule: IDay[]
  isSidebarVisible: boolean
}

export const SidebarSubtitles: React.FC<Props> = ({
  title,
  menuOpen,
  setMenuOpen,
  hotels,
  activeTab,
  handleChange,
  schedule,
  isSidebarVisible
}) => {
  if (!isSidebarVisible) return

  return (
    <>
      <HotelSubtitles
        title={title}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        hotels={hotels}
        activeTab={activeTab}
        handleChange={handleChange}
      />
      <ScheduleSubtitles
        title={title}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        schedule={schedule}
      />
    </>
  )
}
