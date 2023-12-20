import { Icon } from '@iconify/react'
import { useCurrentProject } from '../../../hooks'
import { useTranslation } from '../../../translations/translationContext'
import { TranslationKeys } from '../../../interfaces/translations'

type ModalType = 'overview' | 'map' | 'destination'

interface Props {
  iconText: string
  title: ModalType
  handleOpen: (modalType: ModalType) => void
}

export const ModalsRow = ({ iconText, title, handleOpen }: Props) => {
  const { currentProject } = useCurrentProject()
  const { clientCompany } = currentProject
  const { colorPalette = [] } = clientCompany[0] || {}
  const { t } = useTranslation()

  const translatedTitle = t(title as TranslationKeys)

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
        className={`${
          colorPalette.length > 0
            ? `text-[${colorPalette[2]}]`
            : 'text-primary dark:text-tertiary'
        }`}
        width='40'
      />
      <p className='group-hover:text-secondary hidden md:inline-flex text-base lg:text-lg'>
        {translatedTitle?.replace(/^\w/, (c: string) => c.toUpperCase())}
      </p>
    </div>
  )
}
