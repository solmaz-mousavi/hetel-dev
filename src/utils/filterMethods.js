

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

