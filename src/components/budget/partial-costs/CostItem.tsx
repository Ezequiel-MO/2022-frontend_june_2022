import { Icon } from '@iconify/react'
import accounting from 'accounting'
import { useTranslation } from '../../../translations/translationContext'

interface CostItemProps {
  icon: string
  title: string
  cost: number
  color: string
}

export const CostItem = ({ icon, title, cost, color }: CostItemProps) => {
  const { t } = useTranslation()
  return (
    <div className='shadow-lg my-2 p-2 rounded flex flex-row justify-between dark:bg-gray-50 dark:text-black-50'>
      <Icon icon={icon} color={color} width='30' className='flex-shrink-0' />
      <p className='hidden sm:block'>{t(title)}</p>
      {accounting.formatMoney(cost, '€')}
    </div>
  )
}
