import { TableCell, TableHead, TableRow } from "@mui/material";
import { useCurrentProject } from "../../hooks/useCurrentProject";

const BudgetTableHead = () => {
  const { currentProject } = useCurrentProject();
  return (
    <TableHead>
      <TableRow>
        <TableCell
          width="10%"
          className={`${
            currentProject?.corporateImage?.[0].colorPalette?.[1]
              ? `dark:!bg-[${currentProject?.corporateImage?.[0].colorPalette?.[1]}]`
              : "dark:!bg-brown-100"
          } !bg-brown-50`}
        />
        <TableCell
          width="20%"
          className={`${
            currentProject?.corporateImage?.[0].colorPalette?.[1]
              ? `dark:!bg-[${currentProject?.corporateImage?.[0].colorPalette?.[1]}]`
              : "dark:!bg-brown-100"
          } dark:text-orange-50 !bg-brown-50 text-orange-50 dark:font-extrabold `}
        >
          Event Type
        </TableCell>
        <TableCell
          width="35%"
          className={`${
            currentProject?.corporateImage?.[0].colorPalette?.[1]
              ? `dark:!bg-[${currentProject?.corporateImage?.[0].colorPalette?.[1]}]`
              : "dark:!bg-brown-100"
          } dark:text-orange-50 !bg-brown-50 text-orange-50 dark:font-extrabold `}
        >
          Service
        </TableCell>
        <TableCell
          width="5%"
          className={`${
            currentProject?.corporateImage?.[0].colorPalette?.[1]
              ? `dark:!bg-[${currentProject?.corporateImage?.[0].colorPalette?.[1]}]`
              : "dark:!bg-brown-100"
          } dark:text-orange-50 !bg-brown-50 text-orange-50 dark:font-extrabold `}
        >
          Pax/units
        </TableCell>
        <TableCell
          width="15%"
          className={`${
            currentProject?.corporateImage?.[0].colorPalette?.[1]
              ? `dark:!bg-[${currentProject?.corporateImage?.[0].colorPalette?.[1]}]`
              : "dark:!bg-brown-100"
          } dark:text-orange-50 !bg-brown-50 text-orange-50 dark:font-extrabold `}
        >
          Unit cost w/VAT
        </TableCell>
        <TableCell
          width="15%"
          className={`${
            currentProject?.corporateImage?.[0].colorPalette?.[1]
              ? `dark:!bg-[${currentProject?.corporateImage?.[0].colorPalette?.[1]}]`
              : "dark:!bg-brown-100"
          } dark:text-orange-50 !bg-brown-50 text-orange-50 dark:font-extrabold `}
        >
          Total cost w/VAT
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default BudgetTableHead;
