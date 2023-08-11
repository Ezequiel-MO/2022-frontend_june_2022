import { TableCell } from '@mui/material'
import accounting from 'accounting'
import { useSingleChoiceCells } from '.'
import { IEvent, IRestaurant } from '../../../../interfaces'

interface SingleChoiceCellsProps {
  pax: number
  date: string
  options: IEvent[] | IRestaurant[]
  description: string
  id: string
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
      <TableCell>{description}</TableCell>
      <TableCell>
        <span className='pl-2'>{`${options[0]?.name}`}</span>
      </TableCell>
      <TableCell>{paxOrOne}</TableCell>
      <TableCell>{accounting.formatMoney(options[0]?.price, '€')}</TableCell>
      <TableCell>
        {accounting.formatMoney(paxOrOne * options[0]?.price || 0, '€')}
      </TableCell>
    </>
  )
}
