import { IRestaurant } from '../../../interfaces'
import RenderPhotos from '../../organisms/RenderPhotos'
import { RichParagraph } from '../../atoms/RichParagraph'
import { EntertainmentCards } from '..'
import { PdfViewer } from '../../organisms'

interface Props {
  restaurant: IRestaurant
}

export const RestaurantCard = ({ restaurant }: Props) => {
  return (
    <div id={restaurant._id}>
      <RichParagraph text={restaurant.textContent || ''} />
      <RenderPhotos images={restaurant.imageContentUrl || []} />
      <EntertainmentCards
        entertainments={restaurant.entertainment || []}
        restaurant={restaurant.name}
      />
      <div className='mt-5'>
        <PdfViewer pdfMenus={restaurant.pdfMenus || []} />
      </div>
    </div>
  )
}
