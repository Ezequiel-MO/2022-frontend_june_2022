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

  return (
    <>
      <TableCell>{description}</TableCell>
      <TableCell>
        <span className='pl-2'>{`${options[0]?.name}`}</span>
      </TableCell>
      <TableCell>{pricePerPerson ? pax : 1}</TableCell>
      <TableCell>{accounting.formatMoney(options[0]?.price, '€')}</TableCell>
      <TableCell>
        {accounting.formatMoney(options[0].totalCost || 0, '€')}
      </TableCell>
    </>
  )
}
