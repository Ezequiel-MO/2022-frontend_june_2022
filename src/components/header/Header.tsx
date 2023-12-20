import React, { useState } from 'react'
import {
  useUserLog,
  useDarkMode,
  useCurrentProject,
  useLocalStorageItem
} from '../../hooks'
import HeaderDropdown from './HeaderDropdown'
import { DarkModeToggle } from './DarkModeToggle'
import { LogoutButton } from './LogoutButton'
import { UserAvatar } from './UserAvatar'
import { HeaderDropdownWrapper } from './HeaderDropdownWrapper'
import { Logo } from './Logo'
import { SvgBackground } from './SvgBackground'
import cutt_logo from '../../assets/CUTT_LOGO.png'
import { IProject } from '../../interfaces'
import { ISettings } from '../../interfaces/settings'

const Header: React.FC = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode()
  const { logUserOut, userIsLoggedIn } = useUserLog()
  const { currentProject } = useCurrentProject() as { currentProject: IProject }
  const [dropdownActive, setDropdownActive] = useState(false)
  const { groupLocation, clientCompany, hasExternalCorporateImage } =
    currentProject

  const { imageContentUrl: logoImageUrl } = clientCompany[0] || {}
  const settings = useLocalStorageItem('settings', {}) as ISettings
  const settingsLogo = settings.logo || cutt_logo

  return (
    <>
      <div className='relative h-32 mx-4 lg:mx-8 overflow-hidden dark:bg-black-50 rounded-lg'>
        <div
          className={`bg-secondary absolute top-0 left-0 w-full h-full ${
            hasExternalCorporateImage ? 'z-0' : 'z-20'
          }`}
        ></div>
        <div className='absolute z-30 flex w-full h-full items-center justify-center'>
          <Logo
            hasExternalCorporateImage={hasExternalCorporateImage}
            imageUrl={`${
              hasExternalCorporateImage && logoImageUrl.length > 0
                ? logoImageUrl
                : settingsLogo
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
