import { Typography } from '@mui/material'
import RenderPhotos from '../../ui/renderPhotos/RenderPhotos'
import ParagraphText from '../Text'

export const RestaurantCards = ({ restaurant }) => {
  return (
    <div id={restaurant._id}>
      <Typography variant='h5'>{restaurant.name}</Typography>
      <ParagraphText text={JSON.parse(restaurant.textContent)} />
      <RenderPhotos images={restaurant.imageContentUrl} />
    </div>
  )
}
