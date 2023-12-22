import { tableCellClasses } from '../../constants/styles'

interface HeaderCellProps {
  width: string
  className?: string
  children?: React.ReactNode
}

export const HeaderCell = ({ width, children, className }: HeaderCellProps) => (
  <th
    style={{ width }}
    className={`${tableCellClasses} bg-brown-50 font-extrabold ${
      className || ''
    }`}
  >
    {children}
  </th>
)
