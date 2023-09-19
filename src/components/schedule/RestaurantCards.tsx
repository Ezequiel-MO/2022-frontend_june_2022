import { IRestaurant } from '../../interfaces'
import RenderPhotos from '../organisms/RenderPhotos'
import { RichParagraph } from '../atoms/RichParagraph'
import { EntertainmentCards } from './'

interface Props {
  restaurant: IRestaurant
}

export const RestaurantCards = ({ restaurant }: Props) => {
  return (
    <div id={restaurant._id}>
      <RichParagraph text={restaurant.textContent || ''} />
      <RenderPhotos images={restaurant.imageContentUrl || []} />
      <EntertainmentCards entertainments={restaurant.entertainment || []} />
    </div>
  )
}
