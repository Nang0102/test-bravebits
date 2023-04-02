export const mapOrder = (arr, order, key) => {
  if (!arr || !order || !key) {
    return [];
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      let indexA = order.indexOf(arr[i][key]);
      let indexB = order.indexOf(arr[j][key]);

      if (indexA > indexB) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
};
