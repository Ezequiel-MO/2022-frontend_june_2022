import { Icon } from '@iconify/react'
import { useCurrentProject } from '../../../hooks'
import { useTranslation } from '../../../translations/translationContext'

export const ModalsRow = ({ iconText, title, handleOpen }) => {
  const { currentProject } = useCurrentProject()
  const { clientCompany } = currentProject
  const { colorPalette = [] } = clientCompany[0] || {}
  const { t } = useTranslation()

  const translatedTitle = t(title)

  return (
    <div
      data-for='main'
      data-tip={title}
      data-iscapture='true'
      className='my-1 flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-green-50 hover:text-black-50 cursor-pointer transition-all duration-200'
      onClick={() => handleOpen(`${title}`)}
    >
      <Icon
        icon={iconText}
        color={`${colorPalette.length > 0 ? colorPalette[2] : '#ea5933'}`}
        width='40'
      />
      <p className='group-hover:text-orange-50 hidden md:inline-flex text-base lg:text-lg'>
        {translatedTitle?.replace(/^\w/, (c) => c.toUpperCase())}
      </p>
    </div>
  )
}
