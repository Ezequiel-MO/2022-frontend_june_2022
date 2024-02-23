import { IEntertainment } from '../../../interfaces'
import { EntertainmentCard } from '../4-cards/EntertainmentCard'
import TabbedContent from '../../molecules/tabs/TabbedContent'

interface Props {
  entertainments: IEntertainment[] | []
  restaurant: string
}

export const EntertainmentCards: React.FC<Props> = ({
  entertainments,
  restaurant
}) => {
  if (entertainments.length === 0) return null

  return (
    <div className='entertainment-cards-container'>
      <div className='my-5 text-2xl font-semibold text-white-0 mb-4'>
        Entertainment/Shows @ {restaurant}
      </div>
      <TabbedContent
        items={entertainments}
        renderItem={(entertainment) => (
          <EntertainmentCard entertainment={entertainment} />
        )}
        type='entertainment'
      />
    </div>
  )
}
