import { TableCell } from '@mui/material'

export const HeaderCell = ({ width, children, className }) => (
  <TableCell
    width={width}
    className={`!bg-brown-50 font-extrabold ${className}`}
  >
    {children}
  </TableCell>
)
