import { IRestaurant } from '../../interfaces'
import { RichParagraph } from '../atoms/RichParagraph'
import { Meals } from './Meals'

interface Props {
  id: string
  title: string
  restaurants: IRestaurant[]
  introduction: string
  suplementaryText: boolean
}

export const ScheduleDayMeals = ({
  id,
  title,
  restaurants,
  introduction,
  suplementaryText
}: Props) => {
  if (!restaurants.length) {
    return suplementaryText ? (
      <h3 className='italic m-2'>{`No ${title.toLowerCase()} planned`}</h3>
    ) : null
  }
  return (
    <div id={id} className='page-break-after'>
      <RichParagraph text={introduction} />
      <Meals restaurants={restaurants} />
    </div>
  )
}
