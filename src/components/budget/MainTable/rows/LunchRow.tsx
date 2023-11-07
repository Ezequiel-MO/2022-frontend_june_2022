import { RenderChoiceCells } from '../multipleOrSingle'
import { IRestaurant } from '../../../../interfaces'

interface LunchRowProps {
  items: IRestaurant[]
  date: string
  pax: number
}

export const LunchRow = ({ items, date, pax }: LunchRowProps) => {
  const NoLunch = items.length === 0
  if (NoLunch) return null
  const multipleChoice = items.length > 1
  const props = {
    pax,
    date,
    options: items,
    description: 'Lunch Restaurants',
    id: 'lunch' as 'lunch'
  }

  return (
    <tr>
      <td>{date}</td>
      <RenderChoiceCells multipleChoice={multipleChoice} props={props} />
    </tr>
  )
}
