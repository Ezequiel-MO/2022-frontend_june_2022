import { TableCell } from '@mui/material'
import { accounting } from 'accounting'
import { useSingleChoiceCells } from './'
export const SingleChoiceCells = ({ pax, options, date, description, id }) => {
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
        {accounting.formatMoney(options[0]?.totalCost, '€')}
      </TableCell>
    </>
  )
}
