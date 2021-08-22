import {mapState} from 'vuex'
import {FormatFunction} from './common'

export const validateForm = {
  mixins: [FormatFunction],
  computed: {
    ...mapState("emp", ["departments"])
  },
  methods: {
    /**
     * Validate các trường bắt buộc nhập
     * Author: HHdang (17/7/2021)
     * @param {any} val: giá trị các trường bắt buộc nhập 
     * @returns cờ để hiển thị css cho các trường
     */
    validateRequired(val) {
      if(!val) {
        return false;
      } else {
        return true
      }
    },
    /**
     * Hàm validate là số
     * @param {any} val giá trị trường cần validate
     * @returns Kết quả là số hay không (true or false)
     * Author: HHDAng (17/7/2021)
     */
    validateNumber(val) {
      const re = /^\d+$/;
      if (val == '') {
        return true;
      }
      if (re.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * Validate Email
     * Author: HHdang (17/7/2021)
     * @param {any} val: giá trị trường Email
     * @returns cờ để hiển thị css cho trường
     */
    validateEmail(val) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(val).toLowerCase())) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * Validate số điện thoại
     * Author: HHdang (17/7/2021)
     * @param {any} val: giá trị trường số điện thoại
     * @returns cờ để hiển thị css cho trường
     */
    validatePhoneNumber(val) {
      // eslint-disable-next-line no-useless-escape
      const regx = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
      if (regx.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * Hàm validate phòng ban
     * @param {any} val Tên phòng ban
     * @returns Kết quả có phòng ban đó hay không (true or false)
     * Author: HHDang (17/7/2021)
     */
    validateDepartment(val) {
      const department = this.departments.find(item => item.DepartmentName == val)
      //console.log(department);
      // console.log(!this.departments.filter(item => item.DepartmentName == val).length)

      if(department === undefined) {
        return false;
      } else {
        return true;
      }
    },
    // Hàm validate chung
    validateOption(name, val) {
      switch(name) {
        case "EmployeeCode": 
          return this.validateRequired(val);
        case "EmployeeName":
          return this.validateRequired(val);
        // case "IdentityNumber":
        //   return this.validateNumber(val);
        // case "Email":
        //   if(!this.validateRequired(val)) {
        //     return true;
        //   } else {
        //     return this.validateEmail(val);
        //   }
        // case "PhoneNumber":
        //   if(!this.validateRequired(val)) {
        //     return true;
        //   } else {
        //     return this.validatePhoneNumber(val);
        //   }
        // case "TelephoneNumber":
        //   if(!this.validateRequired(val)) {
        //     return true;
        //   } else {
        //     return this.validatePhoneNumber(val);
        //   }
        case "DepartmentId":
          return this.validateRequired(val) && this.validateDepartment(val)
        default: 
          return true;
      }
    }
  },
}