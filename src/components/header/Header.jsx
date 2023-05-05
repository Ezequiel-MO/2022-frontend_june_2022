import { useState } from 'react'
import { useUserLog, useDarkMode, useCurrentProject } from '../../hooks'
import HeaderDropdown from './HeaderDropdown'
import { DarkModeToggle } from './DarkModeToggle'
import { LogoutButton } from './LogoutButton'
import { UserAvatar } from './UserAvatar'
import { HeaderDropdownWrapper } from './HeaderDropdownWrapper'
import { Logo } from './Logo'
import { SvgBackground } from './SvgBackground'
import cutt_logo from '../../assets/CUTT_LOGO.png'

const Header = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode()
  const { logUserOut, userIsLoggedIn } = useUserLog()
  const { currentProject } = useCurrentProject()
  const [dropdownActive, setDropdownActive] = useState(false)
  const { groupLocation, clientCompany, hasExternalCorporateImage } =
    currentProject

  const { imageContentUrl: logoImageUrl } = clientCompany[0] || {}

  return (
    <>
      <div className='relative h-32 mx-4 lg:mx-8 overflow-hidden dark:bg-black-50 rounded-lg'>
        <div
          className={`absolute top-0 left-0 w-full h-full ${
            hasExternalCorporateImage ? 'z-0' : 'z-20'
          }`}
          style={{ backgroundColor: '#C7BAAE' }}
        ></div>
        <div className='absolute z-30 flex w-full h-full items-center justify-center'>
          <Logo
            hasExternalCorporateImage={hasExternalCorporateImage}
            imageUrl={`${
              hasExternalCorporateImage && logoImageUrl.length > 0
                ? logoImageUrl
                : cutt_logo
            }`}
          />
          <SvgBackground
            hasExternalCorporateImage={hasExternalCorporateImage}
          />

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
        <HeaderDropdownWrapper
          setDropdownActive={setDropdownActive}
          dropdownActive={dropdownActive}
        >
          <HeaderDropdown groupLocation={groupLocation} />
        </HeaderDropdownWrapper>
      )}
    </>
  )
}

export default Header
