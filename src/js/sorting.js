

export const Sorting = {
  methods: {
    /**
     * Hàm sắp xếp lại dữ liệu cho bảng
     * @param {Array} arr Mảng dữ liệu
     * @param {String} fieldName Trường dữ liệu cần sắp xếp
     * @returns Mảng đã sắp xếp
     * Author: HHDang(20/8/2021)
     */
    sortTable(arr, fieldName) {
      switch(fieldName) {
        case "Gender": 
          return arr.sort((firstItem, secondItem) => this.sortNumber(firstItem[fieldName], secondItem[fieldName]));
        case "WorkStatus": 
          return arr.sort((firstItem, secondItem) => this.sortNumber(firstItem[fieldName], secondItem[fieldName]));
        case "Salary": 
          return arr.sort((firstItem, secondItem) => this.sortNumber(firstItem[fieldName], secondItem[fieldName]));
        case "EmployeeCode": 
          return arr.sort((firstItem, secondItem) => this.sortEmployeeCode(firstItem[fieldName], secondItem[fieldName]));
        default:
          return arr.sort((firstItem, secondItem) => this.sortString(firstItem[fieldName], secondItem[fieldName]));
      }
    },
    /**
     * Hàm sắp xếp xâu
     * @param {String} firstItem Tham số thứ nhất
     * @param {String} secondItem Tham số thứ hai
     * @returns Giá trị sau khi so sánh (0, 1)
     * Author: HHDang (20/8/2021)
     */
    sortString(firstItem, secondItem) {
      if(firstItem === null) {
        return 0;
      }
      return firstItem.localeCompare(secondItem);
    },
    /**
     * Hàm sắp xếp số
     * @param {String} firstItem Tham số thứ nhất
     * @param {String} secondItem Tham số thứ hai
     * @returns Giá trị sau khi so sánh
     * Author: HHDang (20/8/2021)
     */
    // Hàm sắp xếp số 
    sortNumber(firstItem, secondItem) {
      // Kiểm tra xem có là số hay không
      if(isNaN(firstItem) || isNaN(secondItem)) {
        return 0;
      }
      if(firstItem === secondItem) {
        return 0;
      } else {
        return firstItem - secondItem;
      }
    },
    /**
     * Hàm sắp xếp theo số trong mã nhân viên
     * @param {String} firstItem Tham số thứ nhất
     * @param {String} secondItem Tham số thứ hai
     * @returns Giá trị sau khi so sánh
     * Author: HHDang (20/8/2021)
     */
    sortEmployeeCode(firstItem, secondItem) {
      // Dùng regex lấy ra số trong mã nhân viên
      let item1 = parseInt(firstItem.match(/\d+/)[0]);
      let item2 = parseInt(secondItem.match(/\d+/)[0]);
      
      if(item1 === item2) {
        return 0;
      } else {
        return item1 - item2;
      }
    }
  },
}