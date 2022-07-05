import { TableCell, TableRow } from "@mui/material";
import accounting from "accounting";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBudget } from "../../../redux/features/budgetSlice";
import { BudgetContext } from "../context/context";
import { getHotelTotal, getTotalBudget } from "./compute-totals-functions";

const TotalBudgetCost = ({ hotels, pax }) => {
  const [selectedHotel, setSelectedHotel] = useState(hotels[0]);
  const { budgetValues } = useContext(BudgetContext);
  const schedule = useSelector(selectBudget);

  useEffect(() => {
    if (budgetValues.selectedHotelName) {
      const selectedHotel = hotels.find(
        (hotel) => hotel.name === budgetValues.selectedHotelName
      );
      setSelectedHotel(selectedHotel);
    }
  }, [budgetValues.selectedHotelName, hotels]);

  return (
    <TableRow>
      <TableCell colSpan={3} />
      <TableCell colSpan={2}>
        <strong>TOTAL BUDGET</strong>
      </TableCell>
      <TableCell>
        <strong>
          {selectedHotel && selectedHotel.price[0] && schedule[0].length !== 0
            ? accounting.formatMoney(
                getTotalBudget(
                  pax,
                  schedule,
                  getHotelTotal(selectedHotel.price[0], schedule.length)
                ),
                "€"
              )
            : schedule[0].length !== 0
            ? accounting.formatMoney(getTotalBudget(pax, schedule, 0), "€")
            : 0}
        </strong>
      </TableCell>
    </TableRow>
  );
};

export default TotalBudgetCost;
