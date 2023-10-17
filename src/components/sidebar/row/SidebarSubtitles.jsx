import { HotelSubtitles, ScheduleSubtitles } from '../'

export const SidebarSubtitles = ({
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
