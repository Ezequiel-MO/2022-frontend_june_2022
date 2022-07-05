import React, { useReducer, forwardRef } from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import HotelRows from "./rows/HotelRows";
import DayRows from "./rows/days/DayRows";
import HotelBreakdownRows from "./rows/hotel/HotelBreakdownRows";
import { BudgetContext } from "./context/context";
import { budgetReducer, initialbudgetValues } from "./context/reducer";
import TotalBudgetCost from "./totals/TotalBudgetCost";
import { useCurrentProject } from "../hooks/useCurrentProject";

const Budget = forwardRef((props, ref) => {
  const { currentProject } = useCurrentProject();
  const { hotels, schedule, nrPax } = currentProject;
  const [budgetValues, dispatch] = useReducer(
    budgetReducer,
    initialbudgetValues
  );

  return (
    <div ref={ref}>
      <BudgetContext.Provider value={{ budgetValues, dispatch }}>
        <div className="overflow-x-auto" id="budget_id">
          <Table
            stickyHeader
            size="small"
            className="text-left divide-y divide-gray-200 dark:divide-black-50 dark:bg-gray-50"
          >
            <TableHead>
              <TableRow>
                <TableCell width="10%" />
                <TableCell
                  width="20%"
                  className="dark:text-orange-50 text-orange-50 dark:font-extrabold "
                >
                  Event Type
                </TableCell>
                <TableCell
                  width="35%"
                  className="dark:text-orange-50 text-orange-50 dark:font-extrabold "
                >
                  Service
                </TableCell>
                <TableCell
                  width="5%"
                  className="dark:text-orange-50 text-orange-50 dark:font-extrabold "
                >
                  Pax/units
                </TableCell>
                <TableCell
                  width="15%"
                  className="dark:text-orange-50 text-orange-50 dark:font-extrabold "
                >
                  Unit cost w/VAT
                </TableCell>
                <TableCell
                  width="15%"
                  className="dark:text-orange-50 text-orange-50 dark:font-extrabold "
                >
                  Total cost w/VAT
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hotels.length > 0 ? (
                <>
                  <HotelRows hotels={hotels} nights={schedule?.length} />
                  <HotelBreakdownRows
                    hotels={hotels}
                    nights={schedule?.length}
                  />
                </>
              ) : null}

              {schedule?.map((day) => (
                <DayRows key={day._id} day={day} pax={nrPax} />
              ))}
              <TotalBudgetCost hotels={hotels} pax={nrPax} />
            </TableBody>
          </Table>
        </div>
      </BudgetContext.Provider>
    </div>
  );
});

export default Budget;
