import { TableCell, TableHead, TableRow } from "@mui/material";

const BudgetTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell width="10%" />
        <TableCell
          width="20%"
          className="dark:text-orange-50 text-orange-50 dark:font-extrabold uppercase"
        >
          Event Type
        </TableCell>
        <TableCell
          width="35%"
          className="dark:text-orange-50 text-orange-50 dark:font-extrabold uppercase"
        >
          Service
        </TableCell>
        <TableCell
          width="5%"
          className="dark:text-orange-50 text-orange-50 dark:font-extrabold uppercase"
        >
          Pax/units
        </TableCell>
        <TableCell
          width="15%"
          className="dark:text-orange-50 text-orange-50 dark:font-extrabold uppercase"
        >
          Unit cost w/VAT
        </TableCell>
        <TableCell
          width="15%"
          className="dark:text-orange-50 text-orange-50 dark:font-extrabold uppercase"
        >
          Total cost w/VAT
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default BudgetTableHead;
