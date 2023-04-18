import RenderPhotos from '../../ui/renderPhotos/RenderPhotos'
import { RichParagraph } from '../atoms/RichParagraph'

export const RestaurantCards = ({ restaurant }) => {
  return (
    <div id={restaurant._id}>
      <RichParagraph text={restaurant.textContent} />
      <RenderPhotos images={restaurant.imageContentUrl} />
    </div>
  )
}
