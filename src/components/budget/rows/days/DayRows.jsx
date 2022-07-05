import React from "react";
import DayRow from "./DayRow";

const DayRows = ({ day, pax }) => {
  return (
    <>
      {day.transfer_in.length > 0 && (
        <DayRow
          pax={day.transfer_in.length}
          date={day.date}
          options={day.transfer_in}
          description="Transfer Aiport/Hotel"
          id="transfer_in"
        />
      )}
      {day.morningEvents.length > 0 && (
        <>
          {day.morningEvents[0].transfer.length > 0 && (
            <DayRow
              pax={day.morningEvents[0].transfer.length}
              date={day.date}
              options={day.morningEvents[0].transfer}
              description="Transfer"
              id="transfer"
            />
          )}
          <DayRow
            pax={pax}
            date={day.date}
            options={day.morningEvents}
            description="Morning Events"
            multipleChoice={`${day.morningEvents.length > 1}`}
            id="morningEvents"
          />
        </>
      )}
      {day.lunch.length > 0 && (
        <>
          <DayRow
            pax={day.lunch[0].transfer.length}
            date={day.date}
            options={day.lunch[0].transfer}
            description="Transfer"
            id="transfer"
          />
          <DayRow
            pax={pax}
            date={day.date}
            options={day.lunch}
            description="Lunch Restaurants"
            multipleChoice={`${day.lunch.length > 1}`}
            id="lunch"
          />
        </>
      )}
      {day.afternoonEvents.length > 0 && (
        <>
          <DayRow
            pax={day.afternoonEvents[0].transfer.length}
            date={day.date}
            options={day.afternoonEvents[0].transfer}
            description="Transfer"
            id="transfer"
          />
          <DayRow
            pax={pax}
            date={day.date}
            options={day.afternoonEvents}
            description="Afternoon Events"
            multipleChoice={`${day.afternoonEvents.length > 1}`}
            id="afternoonEvents"
          />
        </>
      )}
      {day.dinner.length > 0 && (
        <>
          <DayRow
            pax={day.dinner[0].transfer.length}
            date={day.date}
            options={day.dinner[0].transfer}
            description="Transfer"
            id="transfer"
          />
          <DayRow
            pax={pax}
            date={day.date}
            options={day.dinner}
            description="Dinner Restaurants"
            multipleChoice={`${day.dinner.length > 1}`}
            id="dinner"
          />
        </>
      )}

      {day.transfer_out.length > 0 && (
        <DayRow
          pax={day.transfer_out.length}
          date={day.date}
          options={day.transfer_out}
          description="Hotel or City/Airport"
          id="transfer_out"
        />
      )}
    </>
  );
};

export default DayRows;
