import { IconButton, TableCell, TableRow } from "@mui/material";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { accounting } from "accounting";
import { BudgetContext } from "../context/context";
import { BUDGET_ACTIONS } from "../context/reducer";
import HotelMultipleChoice from "./hotel/HotelMultipleChoice";
import { getHotelTotal } from "../totals/compute-totals-functions";
import { useDispatch } from "react-redux";
import { SET_SELECTED_HOTEL } from "../../../redux/features/budgetSlice";

const HotelRows = ({ hotels, nights }) => {
  const dispatch_redux = useDispatch();
  const { budgetValues, dispatch } = useContext(BudgetContext);
  const [selectedHotel, setSelectedHotel] = useState(hotels[0]);

  useEffect(() => {
    dispatch_redux(SET_SELECTED_HOTEL(selectedHotel));
  }, [selectedHotel]);

  useEffect(() => {
    if (budgetValues.selectedHotelName) {
      const selectedHotel = hotels.find(
        (hotel) => hotel.name === budgetValues.selectedHotelName
      );
      setSelectedHotel(selectedHotel);
    }
  }, [budgetValues.selectedHotelName, hotels]);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            onClick={() =>
              dispatch({
                type: BUDGET_ACTIONS.SET_BREAKDOWN_OPEN,
                payload: !budgetValues.hotelBreakdownOpen,
              })
            }
          >
            {budgetValues.hotelBreakdownOpen ? (
              <Icon icon="bx:up-arrow" color="#ea5933" />
            ) : (
              <Icon icon="bx:down-arrow" color="#ea5933" />
            )}
          </IconButton>
        </TableCell>
        <TableCell></TableCell>
        <TableCell>
          <HotelMultipleChoice options={hotels} />
        </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>
          {accounting.formatMoney(
            getHotelTotal(selectedHotel.price[0], nights),
            "€"
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export default HotelRows;
