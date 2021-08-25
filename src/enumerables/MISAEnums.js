
// Enum phân biệt trang
const MISAPage = {
  // Trang khách hàng
  Customer: 1,
  // Trang nhân viên
  Employee: 2
}

// Trạng thái của form
const MISAFormMode = {
  // Thêm mới dữ liệu
  Save: 0,
  // Cập nhật dữ liệu
  Update: 1,
  // Xóa dữ liệu
  Delete: 2,
}

// Trạng thái request
const MISACode = {
  // Thành công
  Ok: 200,
  // Thêm mới thành công
  Created: 201,
  // Dữ liệu gửi lên sai định dạng
  BadRequest: 400,
  // Dữ liệu gửi lên không hợp lệ
  NotValid: 900,
  // Có lỗi xảy ra
  Exception: 500,
}

// Mã giới tính
const Gender = {
  // Nam
  Male: 0,
  // Nữ
  Female: 1,
  // Giới tính khác
  Other: 2,
}

// Tên hiển thị cho gới tính
const GenderName ={
  Male: "Nam",
  Female: "Nữ",
  Other: "Giới tính khác",
}

module.exports =  {
  MISAPage,
  MISAFormMode,
  MISACode,
  Gender,
  GenderName
}