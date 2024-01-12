import { IEntertainment } from '../../../interfaces'
import { RichParagraph } from '../../atoms/RichParagraph'
import RenderPhotos from '../../organisms/RenderPhotos'

interface Props {
  entertainment: IEntertainment
}

export const EntertainmentCard = ({ entertainment }: Props) => {
  return (
    <div className='flex flex-col'>
      <RichParagraph text={entertainment.textContent} />
      <RenderPhotos images={entertainment.imageContentUrl} />
    </div>
  )
}
