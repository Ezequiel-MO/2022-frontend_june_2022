import { accounting } from "accounting";
import { useDispatch } from "react-redux";
import { TableCell } from "@mui/material";
import MultipleChoice from "../days/MultipleChoice";
import { UPDATE_BUDGET_SCHEDULE } from "../../../../redux/features/budgetSlice";
import { useState, useEffect } from "react";

const MultipleChoiceCells = ({ pax, description, options, id, date }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState({});
  const [value, setValue] = useState(options[0].name);

  useEffect(() => {
    const selectedOption = options.find((option) => option.name === value);
    const updatedObject = { date, id, selectedOption };
    setSelected(selectedOption);
    dispatch(UPDATE_BUDGET_SCHEDULE(updatedObject));
    // eslint-disable-next-line
  }, [selected, value]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <TableCell>{`${description} options`}</TableCell>
      <TableCell>
        <MultipleChoice
          options={options}
          handleChange={handleChange}
          value={value}
        />
      </TableCell>
      <TableCell>{pax}</TableCell>
      <TableCell>{accounting.formatMoney(selected["price"], "€")}</TableCell>
      <TableCell>
        {accounting.formatMoney(pax * selected["price"], "€")}
      </TableCell>
    </>
  );
};

export default MultipleChoiceCells;
