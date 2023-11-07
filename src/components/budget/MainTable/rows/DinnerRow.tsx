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
    <tr className='bg-gray-800 dark:border-gray-700 text-gray-300 border-b border-gray-200 hover:bg-gray-700'>
      <td>{date}</td>
      <RenderChoiceCells multipleChoice={multipleChoice} props={props} />
    </tr>
  )
}
