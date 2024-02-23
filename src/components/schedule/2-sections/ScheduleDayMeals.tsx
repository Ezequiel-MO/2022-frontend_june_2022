import { IRestaurant } from '../../../interfaces'
import { Meals } from '../3-cardswrappers/Meals'
import { supplemmentaryText } from '../../../constants/styles/mainsection'
import { ScheduleItemLayout } from './ScheduleItemLayout'

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
  if (!restaurants?.length) {
    return suplementaryText ? (
      <h3
        className={supplemmentaryText}
      >{`No ${title.toLowerCase()} planned`}</h3>
    ) : null
  }
  return (
    <ScheduleItemLayout
      id={id}
      icon='mdi:food-turkey'
      title={`${title} options`}
      introduction={introduction}
    >
      <Meals restaurants={restaurants} />
    </ScheduleItemLayout>
  )
}
