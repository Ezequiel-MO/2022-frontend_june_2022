import accounting from 'accounting'
import { useSingleChoiceCells } from '.'
import { IEvent, IRestaurant } from '../../../../interfaces'

interface SingleChoiceCellsProps {
  pax: number
  date: string
  options: IEvent[] | IRestaurant[]
  description: string
  id: 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner'
}

export const SingleChoiceCells = ({
  pax,
  date,
  options,
  description,
  id
}: SingleChoiceCellsProps) => {
  const { pricePerPerson } = useSingleChoiceCells(pax, options, date, id)

  let paxOrOne = pricePerPerson ? pax : 1

  return (
    <>
      <td>{description}</td>
      <td>
        <span>{`${options[0]?.name}`}</span>
      </td>
      <td>{paxOrOne}</td>
      <td>{accounting.formatMoney(options[0]?.price, '€')}</td>
      <td>{accounting.formatMoney(paxOrOne * options[0]?.price || 0, '€')}</td>
    </>
  )
}
