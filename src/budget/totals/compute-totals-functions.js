export const getHotelTotal = (priceObj, nights = 1) => {
  const {
    DUInr,
    DUIprice,
    DoubleRoomNr,
    DoubleRoomPrice,
    breakfast,
    DailyTax,
  } = priceObj;

  if (
    DUInr < 0 ||
    DUIprice < 0 ||
    DoubleRoomNr < 0 ||
    DoubleRoomPrice < 0 ||
    breakfast < 0 ||
    DailyTax < 0
  ) {
    return 0;
  }
  const hotelTotal =
    nights *
    (DUInr * DUIprice +
      DoubleRoomNr * DoubleRoomPrice +
      breakfast * DUInr +
      breakfast * DoubleRoomNr * 2 +
      DailyTax * DUInr +
      DailyTax * DoubleRoomNr * 2);
  return hotelTotal;
};

export const getTotalTransfers = (schedule) => {
  let transfers = 0;
  schedule.forEach((day) => {
    if (day.morningEvents.length > 0) {
      if (day.morningEvents[0].transfer[0]) {
        transfers +=
          day.morningEvents[0].transfer[0][
            day.morningEvents[0].transfer[0]["selectedService"]
          ] * day.morningEvents[0].transfer.length;
      }
    }
    if (day.lunch.length > 0) {
      if (day.lunch[0].transfer[0]) {
        transfers +=
          day.lunch[0].transfer[0][
            day.lunch[0].transfer[0]["selectedService"]
          ] * day.lunch[0].transfer.length;
      }
    }
    if (day.afternoonEvents.length > 0) {
      if (day.afternoonEvents[0].transfer[0]) {
        transfers +=
          day.afternoonEvents[0].transfer[0][
            day.afternoonEvents[0].transfer[0]["selectedService"]
          ] * day.afternoonEvents[0].transfer.length;
      }
    }
    if (day.dinner.length > 0) {
      if (day.dinner[0].transfer[0]) {
        transfers +=
          day.dinner[0].transfer[0][
            day.dinner[0].transfer[0]["selectedService"]
          ] * day.dinner[0].transfer.length;
      }
    }
  });

  return transfers;
};

export const computeTotal = (field) => {
  let total = 0;
  //if field is an array
  if (Array.isArray(field)) {
    //iterate through the array
    field.forEach((event) => {
      //add the price to the total
      total += event.price;
    });
  }
  //else if morningEvents is a single object
  else {
    //add the price to the total
    total += field.price;
  }
  return total;
};

export const getTotalBudget = (pax = 1, schedule, hotelTotal = 0) => {
  let totalMorningEvents = 0;
  let totalAfternoonEvents = 0;
  let totalLunch = 0;
  let totalDinner = 0;

  let totalTransfers = getTotalTransfers(schedule);
  schedule.forEach((item) => {
    for (let key in item) {
      if (key === "morningEvents") {
        totalMorningEvents += computeTotal(item[key]);
      } else if (key === "afternoonEvents") {
        totalAfternoonEvents += computeTotal(item[key]);
      } else if (key === "lunch") {
        totalLunch += computeTotal(item[key]);
      } else if (key === "dinner") {
        totalDinner += computeTotal(item[key]);
      }
    }
  });

  const totalTransfersIn = schedule[0].transfer_in.reduce(
    (acc, curr) => acc + curr.transfer_in_out,
    0
  );

  const totalTransfersOut = schedule[schedule.length - 1].transfer_out.reduce(
    (acc, curr) => acc + curr.transfer_in_out,
    0
  );

  const totalScheduleCost =
    pax *
    (totalMorningEvents + totalAfternoonEvents + totalLunch + totalDinner);

  return (
    hotelTotal +
    totalScheduleCost +
    totalTransfers +
    totalTransfersIn +
    totalTransfersOut
  );
};
