import { DateObject } from "react-multi-date-picker";

export const getDateArray = (startDate, endDate) => {
	// console.log('start',startDate)
	// console.log('end',endDate)
  let enterDay = new DateObject(startDate);
  const dates = [];

  while (enterDay < endDate) {
    dates.push(enterDay.format());
    enterDay.add(1, "day");
  }

  return dates;
};

export const getDateArray2 = (startDate, endDate) => {
	// console.log('start',startDate)
	// console.log('end',endDate)
  let enterDay = new DateObject(startDate);
  let exitDay = new DateObject(endDate);
  const dates = [];
	// console.log('ss',enterDay)

  while (enterDay <= exitDay) {
    dates.push(enterDay.format());
    enterDay.add(1, "day");
  }

  return dates;
};
