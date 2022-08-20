import { TableCell } from "@mui/material";
import { accounting } from "accounting";

const SingleChoiceCells = ({ pax, options, description, id }) => {
  const itIsAVenue =
    (id === "lunch" || id === "dinner") && options[0].isVenue === true;
  return (
    <>
      {itIsAVenue ? (
        <>
          <TableCell>despasito</TableCell>
          <TableCell>{options[0].name}</TableCell>
          <TableCell>{pax}</TableCell>
          <TableCell>{accounting.formatMoney(options[0].price, "€")}</TableCell>
          <TableCell>
            {accounting.formatMoney(pax * options[0].price, "€")}
          </TableCell>
        </>
      ) : (
        <>
          <TableCell>{description}</TableCell>
          <TableCell>{options[0].name}</TableCell>
          <TableCell>{pax}</TableCell>
          <TableCell>{accounting.formatMoney(options[0].price, "€")}</TableCell>
          <TableCell>
            {accounting.formatMoney(pax * options[0].price, "€")}
          </TableCell>
        </>
      )}
    </>
  );
};

export default SingleChoiceCells;
