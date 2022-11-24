import { TableCell } from '@mui/material'

const TotalRow = ({ option }) => {
  return (
    <>
      <TableCell>{accounting.formatMoney(option.price, '€')}</TableCell>
      <TableCell>{accounting.formatMoney(option.totalCost, '€')}</TableCell>
    </>
  )
}

export default TotalRow
