import { RenderChoiceCells } from '../multipleOrSingle'
import { IRestaurant } from '../../../../interfaces'

interface DinnerRowProps {
  items: IRestaurant[]
  date: string
  pax: number
}

export const DinnerRow = ({ items, date, pax }: DinnerRowProps) => {
  const NoDinner = items.length === 0
  if (NoDinner) return null
  const multipleChoice = items.length > 1
  const props = {
    pax,
    date,
    options: items,
    description: 'Dinner Restaurants',
    id: 'dinner' as 'dinner'
  }

  return (
    <tr>
      <td>{date}</td>
      <RenderChoiceCells multipleChoice={multipleChoice} props={props} />
    </tr>
  )
}
