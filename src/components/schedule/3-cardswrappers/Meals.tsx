import { RestaurantCard } from '..'
import { IRestaurant } from '../../../interfaces'
import TabbedContent from '../../molecules/tabs/TabbedContent'

interface Props {
  restaurants: IRestaurant[] | []
}

export const Meals = ({ restaurants }: Props) => {
  return (
    <div className='flex flex-wrap'>
      <TabbedContent
        items={restaurants}
        renderItem={(restaurant) => <RestaurantCard restaurant={restaurant} />}
        type='restaurant'
      />
    </div>
  )
}
