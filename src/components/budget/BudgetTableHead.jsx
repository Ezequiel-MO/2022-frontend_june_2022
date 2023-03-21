import { TableCell, TableHead, TableRow } from '@mui/material'
import { useCurrentProject } from '../../hooks'

export const BudgetTableHead = () => {
  const { currentProject } = useCurrentProject()

  const { clientCompany } = currentProject
  const { colorPalette = [] } = clientCompany[0] || {}

  const textColorClass =
    colorPalette.length > 0 ? `text-[${colorPalette[0]}]` : 'text-orange-50'

  return (
    <TableHead>
      <TableRow>
        <TableCell
          width='10%'
          className={`${
            colorPalette.length > 1
              ? `dark:!bg-[${colorPalette[1]}]`
              : 'dark:!bg-brown-100'
          } !bg-brown-50`}
        />
        <TableCell
          width='20%'
          className={`${
            colorPalette.length > 1
              ? `dark:!bg-[${colorPalette[1]}]`
              : 'dark:!bg-brown-100'
          } ${textColorClass} !bg-brown-50 font-extrabold`}
        >
          Event Type
        </TableCell>
        <TableCell
          width='35%'
          className={`${
            colorPalette.length > 1
              ? `dark:!bg-[${colorPalette[1]}]`
              : 'dark:!bg-brown-100'
          } ${textColorClass} !bg-brown-50 font-extrabold`}
        >
          Service
        </TableCell>
        <TableCell
          width='5%'
          className={`${
            colorPalette.length > 1
              ? `dark:!bg-[${colorPalette[1]}]`
              : 'dark:!bg-brown-100'
          } ${textColorClass} !bg-brown-50 font-extrabold`}
        >
          Pax/units
        </TableCell>
        <TableCell
          width='15%'
          className={`${
            colorPalette.length > 1
              ? `dark:!bg-[${colorPalette[1]}]`
              : 'dark:!bg-brown-100'
          } ${textColorClass} !bg-brown-50 font-extrabold`}
        >
          Unit cost w/VAT
        </TableCell>
        <TableCell
          width='15%'
          className={`${
            colorPalette.length > 1
              ? `dark:!bg-[${colorPalette[1]}]`
              : 'dark:!bg-brown-100'
          } ${textColorClass} !bg-brown-50 font-extrabold`}
        >
          Total cost w/VAT
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
