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
  },
};

// Thông báo cho các lỗi validate
const Validate = {
  Required: "không được phép để trống!",
  NotValid: "không hợp lệ!",
  Duplicate: "đã tồn tại!",
  NotExist: "không có trong danh mục!",
};

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
};

// Thông tin cho combobox
const Combobox = {
  Pagination: "{0} bản ghi trên 1 trang",
};

// Thông tin cho dropdown
const Dropdown = {
  Company: [
    "Công ty TTHH sản xuất-Thương mại-Dịch vụ Quy phúc",
    "Công ty TTHH sản xuất-Điện tử-Linh kiện Thăng Long",
    "Công ty TTHH sản xuất-Kinh doanh-Bán lẻ Hạ Long",
  ],
};

const Messenger = {
  Delete: {
    success: "Xóa nhân viên thành công!",
    error: "Đã có lỗi xảy ra khi xóa bản ghi!",
    title: "Bạn có chắc muốn xóa nhân viên <{0}> hay không?",
  },
  Exception: "Đã có lỗi xảy ra, vui lòng liên hệ MISA!",
};

const RouterLinkInfo = {
  Dashboard: {
    href: "/dashboard",
    icon: "mi-sidebar-dashboard",
    title: "Tổng quan",
    name: "DashBoard"
  },
  Cash: {
    href: "/cash",
    icon: "mi-sidebar-cash",
    title: "Tiền mặt",
    name: "Cash"
  },
  Bank: {
    href: "/bank",
    icon: "mi-sidebar-bank",
    title: "Tiền gửi",
    name: "Bank"
  },
  Pu: {
    href: "/pu",
    icon: "mi-sidebar-pu",
    title: "Mua hàng",
    name: "Pu"
  },
  Sale: {
    href: "/sale",
    icon: "mi-sidebar-sale",
    title: "Bán hàng",
    name: "Sale"
  },
  Invoice: {
    href: "/invoice",
    icon: "mi-sidebar-invoice",
    title: "Quản lý hóa đơn",
    name: "Invoice"
  },
  Stock: {
    href: "/stock",
    icon: "mi-sidebar-stock",
    title: "Kho",
    name: "Stock"
  },
  Tools: {
    href: "/tools",
    icon: "mi-sidebar-tools",
    title: "Công cụ dụng cụ",
    name: "Tools"
  },
  FixedAssets: {
    href: "/fixed-assets",
    icon: "mi-sidebar-fixed-assets",
    title: "Tài sản cố định",
    name: "FixedAssets"
  },
  Employee: {
    href: "/employee",
    icon: "mi-sidebar-employee",
    title: "Nhân viên",
    name: "Employee"
  },
  Tax: {
    href: "/tax",
    icon: "mi-sidebar-tax",
    title: "Thuế",
    name: "Tax"
  },
  Price: {
    href: "/price",
    icon: "mi-sidebar-price",
    title: "Giá thành",
    name: "Price"
  },
  General: {
    href: "/general",
    icon: "mi-sidebar-general",
    title: "Ngân sách",
    name: "General"
  },
};

module.exports = {
  Popup,
  Validate,
  DisplayName,
  Combobox,
  Dropdown,
  Messenger,
  RouterLinkInfo,
};
