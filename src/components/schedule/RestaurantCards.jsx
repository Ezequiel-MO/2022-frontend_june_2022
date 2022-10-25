import { Typography } from '@mui/material'
import Paragraph from '../../ui/Paragraph'
import RenderPhotos from '../../ui/renderPhotos/RenderPhotos'
import Text from '../Text'

const RestaurantCards = ({ restaurant }) => {
  return (
    <div id={restaurant._id}>
      <Typography variant='h5'>{restaurant.name}</Typography>
      <Text text={JSON.parse(restaurant.textContent)} />
      <RenderPhotos images={restaurant.imageContentUrl} />
    </div>
  )
}

export default RestaurantCards
