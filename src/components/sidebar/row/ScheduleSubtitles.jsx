import { ScheduleDaySubtitles } from './ScheduleDaySubtitles'

export const ScheduleSubtitles = ({
  title,
  menuOpen,
  setMenuOpen,
  schedule
}) => {
  return (
    <div
      className={`${
        menuOpen
          ? 'inline-block transition-all ease-in-out duration-300'
          : 'opacity-0 h-0'
      }`}
    >
      {schedule?.map(
        (day) =>
          title === day.date && (
            <ScheduleDaySubtitles
              key={day._id}
              day={day}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
            />
          )
      )}
    </div>
  )
}
