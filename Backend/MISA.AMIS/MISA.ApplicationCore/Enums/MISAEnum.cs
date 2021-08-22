﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Enums
{
    /// <summary>
    /// MISACode để xác định trạng thái của việc validate
    /// </summary>
    public enum MISACode
    {
        /// <summary>
        /// Dữ liệu hợp lệ
        /// </summary>
        IsValid = 100,
        /// <summary>
        /// Dữ liệu chưa hợp lệ
        /// </summary>
        NotValid = 900,
        /// <summary>
        /// Thành công
        /// </summary>
        Ok = 200,
        /// <summary>
        /// Thất bại
        /// </summary>
        BadRequest = 400,
        /// <summary>
        /// Thêm thành công
        /// </summary>
        Created = 201,
        /// <summary>
        /// Có lỗi xảy ra
        /// </summary>
        Exception = 500,
    }

    /// <summary>
    /// Giới tính
    /// </summary>
    public enum Gender
    {
        /// <summary>
        /// Nữ
        /// </summary>
        Female = 1,
        /// <summary>
        /// Nam
        /// </summary>
        Male = 0,
        /// <summary>
        /// Giới tính khác
        /// </summary>
        Other = 2
    }

    /// <summary>
    /// Trạng thái của object
    /// </summary>
    public enum EntityState
    {
        /// <summary>
        /// Thêm mới
        /// </summary>
        AddNew = 1,
        /// <summary>
        /// Cập nhật
        /// </summary>
        Update = 2,
        /// <summary>
        /// Xóa
        /// </summary>
        Delete = 3
    }
}
