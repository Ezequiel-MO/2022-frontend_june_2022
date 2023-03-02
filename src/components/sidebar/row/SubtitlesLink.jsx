import { Link } from 'react-scroll'

export const SubtitlesLink = ({ subtitles, children }) => {
  const hasSubtitles = (day) => {
    return subtitles.some((subtitle) => subtitle.condition(day))
  }

  return (
    <>
      {children.map((child, index) => {
        const day = child.props.children.props.day
        if (!hasSubtitles(day)) {
          return child
        }
        return (
          <Link
            key={index}
            to={`${day.date}_id`}
            spy={true}
            smooth={true}
            duration={700}
            offset={-100}
            className='inline-block transition-all ease-in-out duration-300'
          >
            {child}
          </Link>
        )
      })}
    </>
  )
}
