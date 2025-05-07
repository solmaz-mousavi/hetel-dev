import { DateObject } from "react-multi-date-picker";

export const filterByID = (data, ID) => {
  const dataInfo = [...data];
  return dataInfo.filter((data) => data.id === ID);
};

export const filterByName = (data, itemName, itemAmounts) => {
  let output = [];

  itemAmounts.forEach((itemAmount) => {
    const dataInfo = [...data];

    const filteredDataInfo = dataInfo.filter(
      (data) => data[itemName] === itemAmount
    );

    if (filteredDataInfo.length > 0) {
      output = [...output, ...filteredDataInfo];
    }
  });
  return output;
};

export const filterByNameOutputByOneItem = (
  data,
  itemName,
  itemAmounts,
  outputItem
) => {
  let output = [];

  itemAmounts.forEach((itemAmount) => {
    const dataInfo = [...data];

    const filteredDataInfo = dataInfo.filter(
      (item) => item[itemName] === itemAmount
    );
    filteredDataInfo.forEach((item) => {
      output.push(item[outputItem]);
    });
  });
  return output;
};

export const getDateArray = (startDate, endDate) => {
	console.log('start',startDate)
	console.log('end',endDate)
  let enterDay = new DateObject(startDate);
  const dates = [];

  while (enterDay < endDate) {
    dates.push(enterDay.format());
    enterDay.add(1, "day");
  }

  return dates;
};

export const getDateArray2 = (startDate, endDate) => {
	console.log('start',startDate)
	console.log('end',endDate)
  let enterDay = new DateObject(startDate);
  let exitDay = new DateObject(endDate);
  const dates = [];
	console.log('ss',enterDay)

  while (enterDay <= exitDay) {
    dates.push(enterDay.format());
    enterDay.add(1, "day");
  }

  return dates;
};
