import { Icon } from '@iconify/react'
import { useCurrentProject } from '../../../hooks'

export const ModalsRow = ({ iconText, title, handleOpen }) => {
  const { currentProject } = useCurrentProject()
  const { clientCompany } = currentProject
  const { colorPalette = [] } = clientCompany[0] || {}

  return (
    <div
      data-for='main'
      data-tip={title}
      data-iscapture='true'
      className='flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-green-50 cursor-pointer transition-all duration-200 group'
      onClick={() => handleOpen(`${title}`)}
    >
      <Icon
        icon={iconText}
        color={`${colorPalette.length > 0 ? colorPalette[2] : '#ea5933'}`}
        width='40'
      />
      <p className='group-hover:text-orange-50 hidden md:inline-flex text-base lg:text-lg'>
        {title?.replace(/^\w/, (c) => c.toUpperCase())}
      </p>
    </div>
  )
}
