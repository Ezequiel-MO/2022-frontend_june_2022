import { IGift } from '../../../interfaces'
import { useTranslation } from '../../../translations/translationContext'
import TabbedContent from '../../molecules/tabs/TabbedContent'
import { GiftCard } from '../4-cards/GiftCard'

interface Props {
  gifts: IGift[] | []
}

export const Gifts = ({ gifts }: Props) => {
  if (gifts.length === 0) return null
  const { t } = useTranslation()

  return (
    <div className='flex flex-wrap page-break-after' id='gifts_id'>
      <TabbedContent
        items={gifts}
        renderItem={(gift) => <GiftCard gift={gift} />}
        type='gift'
      />
    </div>
  )
}
