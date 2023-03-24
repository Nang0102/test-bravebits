export const mapOrder = (arr, order, key) =>{
    for (let i = 0; i < arr.length; i++) {
        // Lặp qua từng phần tử còn lại trong mảng, bắt đầu từ i + 1 để tránh so sánh lại các phần tử đã được sắp xếp
        for (let j = i + 1; j < arr.length; j++) {
          // Lấy vị trí của cột a và cột b trong mảng columnOrder
          let indexA = order.indexOf(arr[i][key]);
          let indexB = order.indexOf(arr[j][key]);
          // console.log('indexB', arr[j][key]);
      
          // Nếu vị trí của cột a lớn hơn vị trí của cột b, hoán đổi vị trí của hai cột trong mảng
          if (indexA > indexB) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
          }
        }
      }
      return arr
}