import ParagraphText from '../Text'
import { Meals } from './Meals'

export const ScheduleDayMeals = ({ title, restaurants, suplementaryText }) => {
  if (!restaurants.length) {
    return suplementaryText ? (
      <h3 className='italic m-2'>{`No ${title.toLowerCase()} planned`}</h3>
    ) : null
  }
  return (
    <>
      <ParagraphText text={restaurants[0].introduction} />
      <Meals restaurants={restaurants} />
    </>
  )
}
