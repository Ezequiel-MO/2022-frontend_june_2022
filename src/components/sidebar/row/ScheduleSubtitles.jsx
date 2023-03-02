import { Link } from 'react-scroll'
import { ScheduleDaySubtitles } from './ScheduleDaySubtitles'

export const ScheduleSubtitles = ({
  title,
  menuOpen,
  setMenuOpen,
  schedule
}) => {
  return (
    <Link
      to={`${title}._id`}
      spy={true}
      smooth={true}
      duration={700}
      offset={-100}
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
    </Link>
  )
}
