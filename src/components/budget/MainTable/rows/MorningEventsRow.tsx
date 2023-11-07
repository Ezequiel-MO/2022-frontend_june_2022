import { RenderChoiceCells } from '../multipleOrSingle'
import { IEvent } from '../../../../interfaces'

interface MorningEventsRowProps {
  items: IEvent[]
  date: string
  pax: number
}

export const MorningEventsRow = ({
  items,
  date,
  pax
}: MorningEventsRowProps) => {
  const NoEvents = items.length === 0
  if (NoEvents) return null

  const multipleChoice = items.length > 1

  const props = {
    pax,
    date,
    options: items,
    description: 'Morning Event',
    id: 'morningEvents' as
      | 'morningEvents'
      | 'afternoonEvents'
      | 'lunch'
      | 'dinner'
  }

  return (
    <tr className='bg-gray-800 dark:border-gray-700 text-gray-300 border-b border-gray-200 hover:bg-gray-700'>
      <td>{date}</td>
      <RenderChoiceCells multipleChoice={multipleChoice} props={props} />
    </tr>
  )
}
