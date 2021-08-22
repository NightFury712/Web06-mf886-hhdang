import {mapState} from 'vuex'
import { Gender, GenderName } from '../Enums/MISAEnums';

export const FormatFunction = {
  computed: {
    ...mapState("emp", ["departments", "positions"])
  },
  methods: {
    /**
     * Format dữ liệu ngày tháng sang ngày/tháng/năm
     * Author: HHDang (6/7/2021)
     * @param {1991-07-09T00:00:00} date
     * @returns 09/07/1991
     */
    formatDate(date, option) {
      date = new Date(date);
      if (Number.isNaN(date.getTime())) {
        return null;
      } else {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        day = day < 10 ? "0" + day : day;
        month = month < 10 ? "0" + month : month;
        if (option == 1) {
          return `${day}/${month}/${year}`;
        } else {
          return `${year}-${month}-${day}`;
        }
      }
    },

    /**
     * Format dữ liệu giới tính
     * Author: HHDang (6/7/2021)
     * @param {1 || 2 || 3} gender
     * @returns Nữ || Nam || Giới tính khác
     */
    formatGender(gender, option) {
      if (option == 1) {
        switch (gender) {
          case Gender.Male:
            return GenderName.Male;
          case Gender.Female:
            return GenderName.Female;
          case Gender.Other: 
            return GenderName.Other;
          default:
            return "Không xác định";
        }
      } 
    },

    /**
     * Format Thông tin phòng ban về tên hoặc Id
     * Author: HHDang (8/7/2021)
     * @param {string} departmentInfo Thông tin phòng ban
     * @param {Number} option Lựa chọn format
     * @returns Tên phòng ban hoặc id
     */
    formatDepartment(departmentInfo, option) {
      if(option == 1) {
        const department = this.departments.filter(item => item.DepartmentId == departmentInfo);
        // console.log(department);
        if(!department.length) {
          return '';
        } else {
          return department[0].DepartmentName;
        }
      } else {
        const department = this.departments.filter(item => item.DepartmentName == departmentInfo);
        if(!department.length) {
          return null;
        } else {
          return department[0].DepartmentId;
        }
      }
    },
    formatOption(name, val, option) {
      switch(name) {
        case "DateOfBirth": 
          return this.formatDate(val, option);
        case "IdentityDate":
          return this.formatDate(val, option);
        case "Gender":
          return this.formatGender(val, option);
        case "DepartmentId":
          return this.formatDepartment(val, option);
        default: return val;
      }
    }
  },
};
