import RenderPhotos from '../../ui/renderPhotos/RenderPhotos'
import { RichParagraph } from '../atoms/RichParagraph'

export const GiftCard = ({ gift }) => {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center'>
        <h2 className='font-bold'>{gift.name}</h2>
      </div>
      <RichParagraph text={gift.textContent} />
      <RenderPhotos images={gift.imageContentUrl} />
    </div>
  )
}
