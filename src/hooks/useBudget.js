import { useDispatch, useSelector } from "react-redux";
import {
  selectBudgetSchedule,
  selectBudgetHotel,
  SET_BUDGET_SCHEDULE,
  UPDATE_BUDGET_SCHEDULE,
  SET_SELECTED_HOTEL,
} from "../redux/features/budgetSlice";

export const useBudget = () => {
  const dispatch = useDispatch();
  const { budget } = useSelector(selectBudgetSchedule);
  const { schedule } = useSelector(selectBudgetHotel);
  const setBudgetSchedule = (schedule) =>
    dispatch(SET_BUDGET_SCHEDULE(schedule));
  const updateBudgetSchedule = (schedule) =>
    dispatch(UPDATE_BUDGET_SCHEDULE(schedule));
  const setSelectedHotel = (hotel) => dispatch(SET_SELECTED_HOTEL(hotel));

  return {
    budget,
    schedule,
    setBudgetSchedule,
    updateBudgetSchedule,
    setSelectedHotel,
  };
};
