import { Icon } from '@iconify/react'
import { FC } from 'react'

interface Props {
  toggleSidebar: () => void
  isSidebarVisible: boolean
}

export const SidebarToggleButton: FC<Props> = ({
  toggleSidebar,
  isSidebarVisible
}) => {
  return (
    <div className='ml-8 cursor-pointer' onClick={toggleSidebar}>
      {isSidebarVisible ? (
        <Icon icon='mdi:collapse-vertical' width={36} />
      ) : (
        <Icon icon='material-symbols:menu' width={36} />
      )}
    </div>
  )
}
