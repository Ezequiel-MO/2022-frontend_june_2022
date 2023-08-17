import { TableCell } from '@mui/material'

interface HeaderCellProps {
  width: string
  className?: string
  children?: React.ReactNode // marking children as optional
}

export const HeaderCell = ({ width, children, className }: HeaderCellProps) => (
  <TableCell
    width={width}
    className={`!bg-brown-50 font-extrabold ${className}`}
  >
    {children}
  </TableCell>
)
