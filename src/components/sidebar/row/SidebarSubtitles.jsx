import { HotelSubtitles, ScheduleSubtitles } from '../'

export const SidebarSubtitles = ({
  title,
  menuOpen,
  setMenuOpen,
  hotels,
  activeTab,
  handleChange,
  schedule
}) => {
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
