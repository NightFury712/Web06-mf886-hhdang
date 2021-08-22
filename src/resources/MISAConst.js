// Thông tin hiển thị cho popup
const Popup = {
  Info: {
    icon: "mi-exclamation-question-48",
    title: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
  }, 
  Error: {
    icon: "mi-rectangle-error-48",
    title: "Đã có lỗi xảy ra, vui lòng liên hệ MISA để được trợ giúp",
  },
  Warning: {
    icon: "mi-rectangle-warning-48",
    title: "Bạn có chắc muốn xóa nhân viên này",
  }
}

// Thông báo cho các lỗi validate
const Validate = {
  Required: "không được phép để trống!",
  NotValid: "không hợp lệ!",
  Duplicate: "đã tồn tại!",
  NotExist: "không có trong danh mục!",
}

// Tên hiển thị cho các trường trong form nhập liệu
const DisplayName = {
  EmployeeCode: "Mã nhân viên",
  EmployeeName: "Tên nhân viên",
  DepartmentId: "Tên đơn vị",
  DateOfBirth: "Ngày sinh",
  Address: "Địa chỉ",
  IdentityNumber: "Số CMND",
  IdentityDate: "Ngày cấp",
  IdentityPlace: "Nơi cấp",
  Email: "Email",
  EmployeePosition: "Chức danh",
  BankAccountNumber: "Tài khoản ngân hàng",
  BankName: "Tên ngân hàng",
  BankBranchName: "Chi nhánh",
  TelephoneNumber: "ĐT cố định",
  PhoneNumber: "ĐT di động",
}

const Combobox = {
  Pagination: "{0} bản ghi trên 1 trang"
}

const Dropdown = {
  Company: [
    "Công ty TTHH sản xuất-Thương mại-Dịch vụ Quy phúc",
    "Công ty TTHH sản xuất-Điện tử-Linh kiện Thăng Long",
    "Công ty TTHH sản xuất-Kinh doanh-Bán lẻ Hạ Long"
  ],
}

module.exports = {
  Popup,
  Validate,
  DisplayName,
  Combobox,
  Dropdown
}