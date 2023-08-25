import RenderPhotos from '../organisms/RenderPhotos'
import { RichParagraph } from '../atoms/RichParagraph'
import { IGift } from '../../interfaces'

interface Props {
  gift: IGift
}

export const GiftCard = ({ gift }: Props) => {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center'>
        <h2 className='font-bold'>{gift?.name}</h2>
      </div>
      <RichParagraph text={gift?.textContent} />
      <RenderPhotos images={gift?.imageContentUrl} />
    </div>
  )
}
