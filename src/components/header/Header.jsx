import { useState } from 'react'
import { useUserLog, useDarkMode, useCurrentProject } from '../../hooks'
import HeaderDropdown from './HeaderDropdown'
import styles from './header.module.css'
import { DarkModeToggle } from './DarkModeToggle'
import { LogoutButton } from './LogoutButton'
import { UserAvatar } from './UserAvatar'
import { HeaderDropdownWrapper } from './HeaderDropdownWrapper'
import { Logo } from './Logo'
import { SvgBackground } from './SvgBackground'

const Header = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode()
  const { logUserOut, userIsLoggedIn } = useUserLog()
  const { currentProject } = useCurrentProject()
  const [dropdownActive, setDropdownActive] = useState(false)
  const { accountManager = [], groupLocation, corporateImage } = currentProject
  const { imageContentUrl = [] } = accountManager[0] || {}

  const imageUrl =
    corporateImage?.length > 0 ? corporateImage[0].imageContentUrl : []

  return (
    <>
      <div className={styles.header__container}>
        <div className='absolute z-30 flex w-full h-full'>
          <Logo userIsLoggedIn={userIsLoggedIn} imageUrl={imageUrl} />
          <SvgBackground />

          <DarkModeToggle
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <LogoutButton isDarkMode={isDarkMode} logUserOut={logUserOut} />
          <UserAvatar
            userIsLoggedIn={userIsLoggedIn}
            currentProject={currentProject}
            setDropdownActive={setDropdownActive}
            dropdownActive={dropdownActive}
          />
        </div>
      </div>
      {dropdownActive && (
        <HeaderDropdownWrapper>
          <HeaderDropdown groupLocation={groupLocation} />
        </HeaderDropdownWrapper>
      )}
    </>
  )
}

export default Header
