import { Icon } from '@iconify/react'
import { Link } from 'react-scroll'
import { useTranslation } from '../../../translations/translationContext.jsx'

interface SidebarTitlesProps {
  iconText: string
  title: string
  colorPalette: string[]
  setMenuOpen: (isOpen: boolean) => void
}

export const SidebarTitles = ({
  iconText,
  title,
  colorPalette,
  setMenuOpen
}: SidebarTitlesProps) => {
  const { t } = useTranslation()
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
          color={`${colorPalette.length > 0 ? colorPalette[2] : '#ea5933'}`}
          width='40'
        />
      </div>
      <p
        className={`group-hover:text-orange-50 hidden md:inline-flex text-base lg:text-lg`}
      >
        {t(title)?.replace(/^\w/, (c: string) => c.toUpperCase())}
      </p>
    </Link>
  )
}
