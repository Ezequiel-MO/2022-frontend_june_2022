import { Icon } from '@iconify/react'
import { Link } from 'react-scroll'

export const SidebarTitles = ({
  iconText,
  title,
  colorPalette,
  setMenuOpen
}) => {
  return (
    <Link
      to={`${title}_id`}
      spy={true}
      smooth={true}
      duration={500}
      offset={-100}
      className='flex items-center space-x-2 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group'
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
    >
      <div
        className='flex-shrink-0'
        data-for='main'
        data-tip={title}
        data-iscapture='true'
      >
        <Icon
          icon={iconText}
          color={`${colorPalette.length > 0 ? colorPalette[0] : '#ea5933'}`}
          width='40'
        />
      </div>
      <p className='group-hover:text-orange-50 hidden md:inline-flex text-base lg:text-lg'>
        {title?.replace(/^\w/, (c) => c.toUpperCase())}
      </p>
    </Link>
  )
}
