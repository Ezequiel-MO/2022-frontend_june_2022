import { TableCell, TableHead, TableRow } from '@mui/material'
import { useCurrentProject } from '../../hooks/useCurrentProject'

export const BudgetTableHead = () => {
  const { currentProject } = useCurrentProject()

  const { corporateImage } = currentProject
  const { colorPalette = [] } = corporateImage[0] || {}

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
          } dark:text-orange-50 !bg-brown-50 text-orange-50 dark:font-extrabold `}
        >
          Event Type
        </TableCell>
        <TableCell
          width='35%'
          className={`${
            colorPalette.length > 1
              ? `dark:!bg-[${colorPalette[1]}]`
              : 'dark:!bg-brown-100'
          } dark:text-orange-50 !bg-brown-50 text-orange-50 dark:font-extrabold `}
        >
          Service
        </TableCell>
        <TableCell
          width='5%'
          className={`${
            colorPalette?.[1]
              ? `dark:!bg-[${colorPalette?.[1]}]`
              : 'dark:!bg-brown-100'
          } dark:text-orange-50 !bg-brown-50 text-orange-50 dark:font-extrabold `}
        >
          Pax/units
        </TableCell>
        <TableCell
          width='15%'
          className={`${
            colorPalette.length > 1
              ? `dark:!bg-[${colorPalette[1]}]`
              : 'dark:!bg-brown-100'
          } dark:text-orange-50 !bg-brown-50 text-orange-50 dark:font-extrabold `}
        >
          Unit cost w/VAT
        </TableCell>
        <TableCell
          width='15%'
          className={`${
            colorPalette.length > 1
              ? `dark:!bg-[${colorPalette[1]}]`
              : 'dark:!bg-brown-100'
          } dark:text-orange-50 !bg-brown-50 text-orange-50 dark:font-extrabold `}
        >
          Total cost w/VAT
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
