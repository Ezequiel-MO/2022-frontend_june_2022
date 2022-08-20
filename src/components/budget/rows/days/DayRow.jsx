import { TableCell, TableRow } from "@mui/material";
import React from "react";
import MultipleChoiceCells from "../cells/MultipleChoiceCells";
import SingleChoiceCells from "../cells/SingleChoiceCells";
import TransferCells from "../cells/TransferCells";
import TransferInOutCells from "../cells/TransferInOutCells";

const DayRow = ({
  pax,
  date,
  options,
  description,
  id,
  multipleChoice = false,
}) => {
  if (id === "transfer_in" || id === "transfer_out") {
    return (
      <TableRow>
        <TableCell>{date}</TableCell>
        <TransferInOutCells
          description={description}
          options={options}
          pax={pax}
          id={id}
        />
      </TableRow>
    );
  }

  if (id === "transfer") {
    //if the selected service is empty, then the row is not visible
    if (
      options[0]?.selectedService === "" ||
      options[0]?.selectedService === undefined
    ) {
      return null;
    }
    return (
      <TableRow>
        <TableCell>{date}</TableCell>
        <TransferCells
          description={description}
          options={options}
          pax={pax}
          id={id}
        />
      </TableRow>
    );
  }

  if (
    id === "morningEvents" ||
    id === "lunch" ||
    id === "afternoonEvents" ||
    id === "dinner"
  ) {
    return (
      <TableRow>
        <TableCell>{date}</TableCell>
        {multipleChoice === "true" ? (
          <MultipleChoiceCells
            description={description}
            options={options}
            pax={pax}
            id={id}
            date={date}
          />
        ) : (
          <SingleChoiceCells
            description={description}
            options={options}
            pax={pax}
            id={id}
          />
        )}
      </TableRow>
    );
  }

  return <div></div>;
};
export default DayRow;
