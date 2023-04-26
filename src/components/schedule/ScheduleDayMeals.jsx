import { RichParagraph } from '../atoms/RichParagraph'
import { Meals } from './Meals'

export const ScheduleDayMeals = ({
  title,
  restaurants,
  suplementaryText,
  id
}) => {
  if (!restaurants.length) {
    return suplementaryText ? (
      <h3 className='italic m-2'>{`No ${title.toLowerCase()} planned`}</h3>
    ) : null
  }
  return (
    <div id={id} className='page-break-after'>
      <RichParagraph text={restaurants[0].introduction} />
      <Meals restaurants={restaurants} />
    </div>
  )
}
