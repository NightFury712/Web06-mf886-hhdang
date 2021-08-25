<template>
  <div>
    <!-- <BasePopupWarning 
      :popupInfo="popupInfo" 
      @btnSaveClick="btnSavePopupClick"
      v-if="popupFlag.dialog"
      :btnCancelDialog="btnCancelDialog"
    /> -->
    <div tabindex="0"></div>
    <div tabindex="1"></div>
    <BasePopupInfo 
      v-if="popupFlag.dialog"
      :btnCancelDialog="btnCancelDialog"
      @btnCloseClick="btnClosePopupClick"
      @btnSaveClick="btnStore"
      :popup="popup.dialog"
    />
    <BasePopupInfo 
      v-if="popupFlag.error"
      :btnCancelDialog="btnCancelDialog"
      @btnSaveClick="errPopupSave()"
      :popup="popup.error"
    />
    <div
      class="dark-background dialog-background"
      :class="{ hidden: !dialogFlag, show: dialogFlag }"
    >
    </div>
    <div
      class="dialog middle"
      :class="{ hidden: !dialogFlag, show: dialogFlag }"
      @keydown.esc.exact.prevent="closeDialog()"
      @keydown.ctrl.83.exact.prevent.stop="btnStore()"
      @keydown.ctrl.shift.83.exact.prevent.stop="btnStoreAndAdd()"
    >
      <div class="dialog-header">
        <div class="flex dialog-header-title">
          <span class="title">Thông tin nhân viên</span>
          <BaseCheckbox 
            :checkboxInfo="{
              id: 'checkbox-employee-1',
              name: 'checkbox-employee',
              title: 'Là khách hàng'
            }"
            style="margin: 0 20px"
            v-tooltip="'Tính năng đang phát triển'"
          />
          <BaseCheckbox 
            :checkboxInfo="{
              id: 'checkbox-employee-2',
              name: 'checkbox-employee',
              title: 'Là nhà cung cấp'
            }"
            style="margin: 0 20px"
            v-tooltip="'Tính năng đang phát triển'"
          />
        </div>
        <div class="btn-close-dialog">
          <div 
            class="mi mi-24 mi-help btn-help"
            v-tooltip.bottom="'Giúp'"
          >

          </div>
          <button
            class="btn-close close-dialog"
            @click="closeDialog()"
            v-tooltip.bottom="'Đóng (Esc)'"
          >
          </button>
        </div>
      </div>
      <div class="dialog-content-container">
        <div class="dialog-content">
          <div class="container-top">
            <div class="container-top-left w-1/2 p-r-26">
              <div class="flex row-input">
                <div class="emp-info-item w-2/5 p-r-6">
                  <div class="emp-info-title">
                    <span class="title">Mã</span>
                    <span class="star">*</span>
                  </div>
                  <BaseTextBox 
                    :inputInfo="inputInfo.EmployeeCode" 
                    @TabFirst="TabFirst()"
                  />
                </div>
                <div class="emp-info-item w-3/5">
                  <div class="emp-info-title">
                    <span class="title">Tên</span>
                    <span class="star">*</span>
                  </div>
                  <BaseTextBox :inputInfo="inputInfo.EmployeeName" />
                </div>
              </div>
              <div class="row-input w-full">
                <div class="emp-info-item">
                  <div class="emp-info-title">
                    <span class="title">Đơn vị</span>
                    <span class="star">*</span>
                  </div>
                  <BaseCombobox 
                    :cbxInfo="combobox.department" 
                    :content="departments" 
                    :inputValue="this.getEmployeeDetail ? this.formatOption('DepartmentId', this.getEmployeeDetail.DepartmentId, 1) : ''"
                  />
                </div>
              </div>
              <div class="row-input w-full">
                <div class="emp-info-item">
                  <div class="emp-info-title">
                    <span class="title">Chức danh</span>
                  </div>
                  <BaseTextBox 
                    :inputInfo="inputInfo.EmployeePosition" 
                  />
                </div>
              </div>
            </div>
            <div class="container-top-right w-1/2">
              <div class="flex row-input w-full">
                <div class="emp-info-item w-2/5 p-r-6">
                  <div class="emp-info-title">
                    <span class="title">Ngày sinh</span>
                  </div>
                  <BaseDatePick 
                    :inputInfo="inputInfo.DateOfBirth" 
                    :dateBinding="date.DateOfBirth"
                  />
                </div>
                <div class="emp-info-item w-3/5 p-l-10">
                  <div class="emp-info-title">
                    <span class="title">Giới tính</span>
                  </div>
                  <div class="flex emp-info-item w-full" style="align-items: center; height: 30px">
                    <BaseRadioButton 
                      :radioInfo="radioBtnInfo[0]"
                      :inputValue="genderValue"
                      @radioInput="radioInput($event)"
                      class="w-1/3"
                    />
                    <BaseRadioButton 
                      :radioInfo="radioBtnInfo[1]"
                      :inputValue="genderValue"
                      @radioInput="radioInput($event)"
                      class="w-1/3"
                    />
                    <BaseRadioButton 
                      :radioInfo="radioBtnInfo[2]"
                      :inputValue="genderValue"
                      @radioInput="radioInput($event)"
                      class="w-1/3"
                    />
                  </div>
                </div>
              </div>
              <div class="flex row-input w-full">
                <div class="emp-info-item w-3/5 p-r-6">
                  <div class="emp-info-title">
                    <span class="title">Số CMND</span>
                  </div>
                  <BaseTextBox :inputInfo="inputInfo.IdentityNumber" />
                </div>
                <div class="emp-info-item w-2/5">
                  <div class="emp-info-title">
                    <span class="title">Ngày cấp</span>
                  </div>
                  <BaseDatePick 
                    :inputInfo="inputInfo.IdentityDate" 
                    :dateBinding="date.IdentityDate"
                  />
                </div>
              </div>
              <div class=" row-input w-full">
                <div class="emp-info-item w-full">
                  <div class="emp-info-title">
                    <span class="title">Nơi cấp</span>
                  </div>
                  <BaseTextBox :inputInfo="inputInfo.IdentityPlace" />
                </div>
              </div>
            </div>
          </div>
          <div class="container-bottom">
            <div class="container-bottom-content">
              <div class="row-input w-full">
                <div class="emp-info-item w-full">
                  <div class="emp-info-title">
                    <span class="title">Địa chỉ</span>
                  </div>
                  <BaseTextBox :inputInfo="inputInfo.Address" />
                </div>
              </div>
              <div class="flex row-input w-3/4">
                <div class="emp-info-item w-1/3 p-r-6">
                  <div class="emp-info-title">
                    <span class="title">ĐT di động</span>
                  </div>
                  <BaseTextBox :inputInfo="inputInfo.PhoneNumber" />
                </div>
                <div class="emp-info-item w-1/3 p-r-6">
                  <div class="emp-info-title">
                    <span class="title">ĐT cố định</span>
                  </div>
                  <BaseTextBox :inputInfo="inputInfo.TelephoneNumber" />
                </div>
                <div class="emp-info-item w-1/3">
                  <div class="emp-info-title">
                    <span class="title">Email</span>
                  </div>
                  <BaseTextBox :inputInfo="inputInfo.Email" />
                </div>
              </div>
              <div class="flex row-input w-3/4">
                <div class="emp-info-item w-1/3 p-r-6">
                  <div class="emp-info-title">
                    <span class="title">Tài khoản ngân hàng</span>
                  </div>
                  <BaseTextBox :inputInfo="inputInfo.BankAccountNumber" />
                </div>
                <div class="emp-info-item w-1/3 p-r-6">
                  <div class="emp-info-title">
                    <span class="title">Tên ngân hàng</span>
                  </div>
                  <BaseTextBox :inputInfo="inputInfo.BankName" />
                </div>
                <div class="emp-info-item w-1/3">
                  <div class="emp-info-title">
                    <span class="title">Chi nhánh</span>
                  </div>
                  <BaseTextBox :inputInfo="inputInfo.BankBranchName" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-footer">   
          <div class="divide"></div>
          <div class="footer-button">
            <div class="footer-button-left">
              <button
                class="m-btn btn-cancel btn-cancel-dialog"
                @click="closeDialog()"
                tabindex="19"
                ref="btnCancelDialog"
              >
                Hủy
              </button>
            </div>
            <div class="footer-button-right">
              <button
                class="m-btn btn-cancel btn-cancel-dialog"
                @click="btnStore()"
                tabindex="20"
                v-tooltip.bottom="'Cất (Ctrl + S)'"
                ref="btnStore"
              >
                Cất
              </button>
              <div>

              </div>
              <BaseButton 
                :btnStyle="btnStyle" 
                class="btn-save" 
                @btnClick="btnStoreAndAdd()"
                tabindex="21"
                :isShow="loadingBtn.save"
                v-tooltip.bottom="'Cất và thêm (Ctrl + Shift + S)'"
                @tabEnd="tabEnd()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../../../css/common/tooltip.css");
@import url("../../../css/common/dialog.css");
@import url("../../../css/common/icon.css");
</style>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCombobox from '../../../components/base/BaseCombobox.vue';
import BaseTextBox from '../../../components/base/BaseTextBox.vue';
import BaseDatePick from '../../../components/base/BaseDatePick.vue'
import { FormatFunction } from '../../../js/common'
import { validateForm } from '../../../js/validate'
import { Toast } from '../../../js/toast'
import { Pagination } from '../../../js/pagination'
import { MISACode, MISAFormMode, Gender, GenderName } from '../../../enumerables/MISAEnums'
import { Popup, DisplayName, Validate, Messenger } from '../../../resources/MISAConst'
import BaseRadioButton from '../../../components/base/BaseRadioButton.vue';
import BaseCheckbox from '../../../components/base/BaseCheckbox.vue';
import BasePopupInfo from '../../../components/base/BasePopupInfo.vue';



export default {
  components: { 
    BaseButton, 
    BaseTextBox,
    BaseRadioButton,
    BaseCheckbox, 
    BaseCombobox,
    BaseDatePick,
    BasePopupInfo 
  },
  name: "EmployeeDetail",
  mixins: [FormatFunction , validateForm, Toast, Pagination],
  data() {
    return {
      btnStyle: {
        icon: 'far fa-save',
        text: "Cất và Thêm",
      },
      popup: {
        dialog: {
          icon: Popup.Info.icon,
          title: Popup.Info.title,
          flagName: "dialog",
          btnContinue: {
            flag: true,
            title: "Hủy"
          },
          btnClose: {
            flag: true,
            title: "Không"
          },
          btnSave: {
            flag: true,
            title: "Có"
          },
          center: false,
        },
        error: {
          icon: Popup.Error.icon,
          title: Popup.Error.title,
          flagName: "error",
          btnContinue: {
            flag: false,
            title: "Hủy"
          },
          btnClose: {
            flag: false,
            title: "Không"
          },
          btnSave: {
            flag: true,
            title: "Đóng"
          },
        }
      },
      inputInfo: {
        EmployeeCode: {
          name: "EmployeeCode",
          type: "text",
          tabindex: 1,
          maxLength:"20",
          tooltip: `${DisplayName.EmployeeCode} ${Validate.Required}`,
        },
        EmployeeName: {
          name: "EmployeeName",
          type: "text",
          tabindex: 2,
          maxLength:"100",
          tooltip: `${DisplayName.EmployeeName} ${Validate.Required}`
        },
        DateOfBirth: {
          name: "DateOfBirth",
          type: "date",
          tabindex: 5,
        },
        IdentityNumber: {
          name: "IdentityNumber",
          type: "text",
          tabindex: 9,
          maxLength:"20",
          tooltip: `${DisplayName.IdentityNumber} ${Validate.NotValid}`
        },
        IdentityDate: {
          name: "IdentityDate",
          type: "date",
          tabindex: 10,
        },
        IdentityPlace: {
          name: "IdentityPlace",
          type: "text",
          tabindex: 11,
        },
        EmployeePosition: {
          name: "EmployeePosition",
          type: "text",
          tabindex: 4,
          maxLength:"255",
        },
        Address: {
          name: "Address",
          type: "text",
          tabindex: 12,
          maxLength:"255",
        },
        PhoneNumber: {
          name: "PhoneNumber",
          type: "text",
          tabindex: 13,
          maxLength:"20",
          tooltip: `${DisplayName.PhoneNumber} ${Validate.NotValid}`
        },
        TelephoneNumber: {
          name: "TelephoneNumber",
          type: "text",
          tabindex: 14,
          maxLength:"20",
          tooltip: `${DisplayName.TelephoneNumber} ${Validate.NotValid}`
        },
        BankAccountNumber: {
          name: "BankAccountNumber",
          type: "text",
          tabindex: 16,
          maxLength:"20",
          tooltip: `${DisplayName.BankAccountNumber} ${Validate.NotValid}`
        },
        BankName: {
          name: "BankName",
          type: "text",
          tabindex: 17,
          maxLength:"255",
        },
        BankBranchName: {
          name: "BankBranchName",
          type: "text",
          tabindex: 18,
          maxLength:"255",
        },
        Email: {
          name: "Email",
          type: "text",
          tabindex: 15,
          maxLength:"100",
          tooltip: `${DisplayName.Email} ${Validate.NotValid}`
        },
      },
      combobox: {
        department: {
          type: 'formadd',
          name: 'DepartmentName',
          ref: 'DepartmentId',
          flagName: 'addDepartment',
          tabindex: 3
        },
      },
      radioBtnInfo: [
        { name: "gender", value: Gender.Male, id: "radio-gender-0", tabindex: 6, title: GenderName.Male},
        { name: "gender", value: Gender.Female, id: "radio-gender-1", tabindex: 7, title: GenderName.Female},
        { name: "gender", value: Gender.Other, id: "radio-gender-2", tabindex: 8, title: "Khác"},
      ],
      flagPost: true,
      employee: {},
      employeeProps: [
        "EmployeeCode",
        "EmployeeName",
        "DateOfBirth",
        "Address",
        "IdentityNumber",
        "IdentityDate",
        "IdentityPlace",
        "Email",
        "EmployeePosition",
        "BankAccountNumber",
        "BankName",
        "BankBranchName",
        "TelephoneNumber",
        "PhoneNumber",
        "DepartmentId",
      ],
      isShow: false,
      date: {
        DateOfBirth: '',
        IdentityDate: ''
      },
      genderValue: null,
      currentEmployee: {},
      errorInfo: {
        fieldName: '',
        message: ''
      },
    }
  },
  computed: {
    ...mapState("event", ["dialogFlag", "formMode", "formFlag", "popupFlag", "loadingBtn"]),
    ...mapState("emp", [
      "formRef", 
      "departments", 
      "positions",
      "newEmployeeCode",
      ]),
    ...mapGetters("emp", ["getEmployeeDetail"]),
    btnCancelDialog() {
      return this.$refs.btnCancelDialog;
    }
  },
  methods: {
    ...mapActions("emp", [
      "add", 
      "edit", 
      "loadData", 
      "setEmployee", 
      "getNewEmployeeCode",
      "setPageNum",
      ]),
    ...mapActions("event", [
      "toggleDialog", 
      "showSpinner",
      "hideSpinner", 
      "setFormFlagTrue", 
      "togglePopup",
      "hideCbx"
    ]),
    /**
     * Khi ấn nút đóng form :
     * + Nếu dữ liệu thay đổi thì hiển thị popup
     * + Nếu dữ liệu ko đổi thì cho phép đóng form ngay lập tức
     * Author: HHDang(18/08/2021)
     */
    closeDialog() {
      this.hideCbx("addDepartment")
      if(this.compareData()) {
        this.toggleDialog()
      } else {
        this.togglePopup(this.popup.dialog.flagName);
      }
    },

    /**
     * Hàm xử lý khi nhấn nút đóng của popup
     * Author: HHDang(18/08/2021)
     */
    btnClosePopupClick: function() {
      // Gán giá trị nhân viên trong store bằng null
      this.$store.dispatch("emp/setEmployee", null);
      // Đóng popup
      this.togglePopup(this.popup.dialog.flagName);
      // Đóng form nhập liệu
      this.toggleDialog();
    },

    /**
     * Hàm xử lý sự kiện khi đóng popup báo lỗi
     * Author: HHDang (19/8/2021)
     */
    errPopupSave() {
      let fieldName = this.errorInfo.fieldName
      // Thay đổi tiêu đề popup hiển thị thông tin lỗi
      if(fieldName != "DepartmentId"){
        this.inputInfo[fieldName].tooltip = this.errorInfo.message;
      }
      this.formFlag[fieldName] = false;
      // Focus vào trường bị lỗi
      this.formRef[fieldName].focus();
    },

    /**
     * Hàm xử lý khi thêm mới hoặc sửa (nhấn nút cất)
     * Author: HHDang(18/08/2021)
     */
    async btnStore() {
      this.hideCbx("addDepartment")
      const ref = this.formRef
      const flag = await this.handerData(ref);
      // Nếu thực hiện thành công
      if(flag) {
        // Đóng form nhập liệu
        this.toggleDialog();
        // Load lại dữ liệu
        this.getPageNum();
      }
    },
    /**
     * Khi nhấn nút cất và thêm thì:
     * + Thêm mới (hoặc sửa)
     * + Reset dữ liệu trong form
     * + Lấy mã nhân viên mới và binding lên for
     * Author: HHDang (19/8/2021)
     */
    async btnStoreAndAdd() {
      this.hideCbx("addDepartment")
      const ref = this.formRef
      const flag = await this.handerData(ref);
      if(flag) {
        this.employeeProps.forEach((item) => {
          if(item == "DateOfBirth" || item == "IdentityDate") {
            this.date[item] = ''
          } else {
            ref[item].value = ''
          }
        })
        // Lấy mã nhân viên mới 
        const newCode = await this.getNewEmployeeCode();
        ref.EmployeeCode.value = newCode;
        // Gán lại radio button về vị trí đầu tiên
        this.genderValue = Gender.Male;
        // Gán lại trạng thái form thành thêm mới
        this.formMode.status = MISAFormMode.Save;
        // Gán lại thông tin nhân viên hiện tại để so sánh
        this.currentEmployee = this.initDataObj();
        // Load lại dữ liệu
        this.getPageNum();
      }
    },
    /**
     * Hàm xử lý validate và call api
     * Author: HHDang(18/08/2021)
     */
    async handerData(ref) {
      this.flagPost = true;
      const flag = this.formFlag
      this.employeeProps.forEach((item) => {
        flag[item] = this.validateOption(item, ref[item].value?.trim());
        this.flagPost &= flag[item];
      })
      // Kiểm tra tính hợp lệ của tất cả các trường
      if(this.flagPost) {
        // Nếu trạng thái form là thêm mới
        if(this.formMode.status == MISAFormMode.Save) {
          return await this.postData();
        }
        // Nếu trạng thái form là cập nhật
        if(this.formMode.status == MISAFormMode.Update) {
          return await this.putData();
        }
      } else {
        this.employeeProps.every((item) => {
          if(!flag[item]) {
            // Khởi tạo thông tin về lỗi để hiển thị lên popup
            if(item === "DepartmentId" && this.formRef[item].value.trim() != '') {
              // Lỗi nhập liệu không hợp lệ
              this.errorInfo.fieldName = item;
              this.errorInfo.message = `${DisplayName[item]} ${Validate.NotExist}`;
              this.popup.error.title = `${DisplayName[item]} ${Validate.NotExist}`;
              this.popup.error.icon = Popup.Error.icon
              this.popup.error.center = true;
              this.togglePopup("error");
            } else {
              // Lỗi ko nhập các trường bắt buộc
              this.errorInfo.fieldName = item;
              this.errorInfo.message = `${DisplayName[item]} ${Validate.Required}`;
              this.popup.error.title = `${DisplayName[item]} ${Validate.Required}`;
              this.popup.error.icon = Popup.Error.icon
              this.popup.error.center = true;
              this.togglePopup("error");
            }
            return false;
          }
          return true;
        })
        return false;
      }
    },
    /**
     * Hàm thực hiện chức năng thêm mới
     * Author: HHDang(18/08/2021)
     */
    async postData() {
      let newEmployee = this.initDataObj();

      this.showSpinner()
      // Call api thêm mới dữ liệu
      const result = await this.add(newEmployee);
      this.hideSpinner()
      // Thêm mới thành công sẽ đóng form và đưa ra thông báo
      if(result.MISACode === MISACode.Created) {
        // Thêm mới thành công thì quay lại trang đầu tiên
        this.setPageNum(0);
        // Hiển thị toast thông báo
        this.toast({
          message: result.Messenger,
          type: 'success',
          duration: 2000
        })
        return true;
      }
      else if(result.MISACode === MISACode.NotValid) {
        // Khởi tạo thông tin về lỗi
        this.errorInfo.fieldName = result.Data.devMsg.fieldName;
        this.errorInfo.message = result.Messenger;
        this.popup.error.title = result.Messenger;
        this.popup.error.icon = Popup.Warning.icon
        this.popup.error.center = false;

        // Hiển thị popup nếu có lỗi về validate phía backend
        this.togglePopup(this.popup.error.flagName);
        return false;
      } 
      else {
        // Có lỗi xảy ra sẽ có thông báo hiển thị lỗi
        this.toast({
          message: Messenger.Exception,
          type: 'error',
          duration: 2000
        })
        return false;
      }
    },
    /**
     * Hàm thực hiện chức năng sửa
     * Author: HHDang(18/08/2021)
     */
    async putData() {
      // clone thông tin nhân viên được chọn để cập nhật
      let newEmployee = this.initDataObj();
      this.showSpinner()
      // Gọi api cập nhật và trả về status code
      const result = await this.edit(newEmployee);
      this.hideSpinner()

      // Nếu cập nhật thành công sẽ đưa ra thông báo và đống form
      if(result.MISACode === MISACode.Ok) {
        this.toast({
          message: result.Messenger,
          type: 'success',
          duration: 2000
        });
        return true;
      } 
      else if(result.MISACode === MISACode.NotValid) {
        // Khởi tạo thông tin về lỗi
        this.errorInfo.fieldName = result.Data.devMsg.fieldName;
        this.errorInfo.message = result.Messenger;
        this.popup.error.title = result.Messenger;
        this.popup.error.icon = Popup.Warning.icon
        this.popup.error.center = false;

        // Hiển thị popup nếu có lỗi về validate phía backend
        this.togglePopup(this.popup.error.flagName);
        return false;
      }
      else {
        // Thất bại sẽ đưa ra thông báo lỗi
        this.toast({
          message: Messenger.Exception,
          type: 'error',
          duration: 2000
        });
        return false;
      }
    },
    /**
     * Cập nhật giá trị giới tính mỗi khi chọn radio button
     * @param value giá trị giới tính được chọn
     * Author: HHDang(18/06/2021)
     */
    radioInput(value) {
      this.genderValue = parseInt(value);
    },
    /**
     * Khởi tạo object chứa thông tin nhân viên
     * @returns object chứa thông tin nhân viên
     * Author: HHDang(18/08/2021)
     */
    initDataObj() {
      const ref = this.formRef
      let newEmployee = {
      };
      // Clone thông tin nhân viên 
      newEmployee = JSON.parse(JSON.stringify(this.getEmployeeDetail ? this.getEmployeeDetail : {}));
      // Format lại dữ liệu đầu vào 
      this.employeeProps.forEach((item) => {
        if(item == "DateOfBirth" || item == "IdentityDate") {
          newEmployee[item] = this.formatOption(item, ref[item].value, 2);
        } else {
          newEmployee[item] = this.formatOption(item, ref[item].value?.trim(), 2);
        }
      })
      newEmployee.Gender = this.genderValue;
      return newEmployee;
    },
    /**
     * Binding dữ liệu lên bảng
     * Author: HHDang (18/08/2021)
     */
    bindingData() {
      const ref = this.formRef
      ref.EmployeeCode.focus();
      let newCode;
      newCode = this.newEmployeeCode;
      // Binding dữ liệu lên bảng
      this.employeeProps.forEach(async (item) => {
        let valueBinding = '';
        
        if(this.formMode.status === MISAFormMode.Save && item == "EmployeeCode") 
        {
          ref[item].value = newCode;
        }
        else if(item == "DateOfBirth" || item == "IdentityDate") 
        {
          // Do nothing
        }
        else
        {
          valueBinding = this.getEmployeeDetail ? this.formatOption(item, this.getEmployeeDetail[item], 1) : '';
          ref[item].value = valueBinding;
        }
      })
      this.$nextTick(() => {
        this.currentEmployee = this.initDataObj();
      });
    },
    /**
     * So sánh dữ liệu ban đầu và dữ liệu sau khi nhập liệu
     * Author: HHDang (20/08/2021)
     */
    compareData() {
      let newEmployee = this.initDataObj();
      let currEmploye = JSON.parse(JSON.stringify(this.currentEmployee));
      if(JSON.stringify(newEmployee) === JSON.stringify(currEmploye)) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * Xử lý sự kiện tránh tab ra ngoài form
     * Author: HHDang (20/08/2021)
     */
    tabEnd() {
      this.$refs.btnStore.focus();
    },
    /**
     * Xử lý sự kiện tránh tab ra ngoài form
     * Author: HHDang (20/08/2021)
     */
    TabFirst() {
      this.formRef.EmployeeName.focus();
    }
  },
  created() {
    // Bind dữ liệu cho các trường ngày/tháng/năm
    this.date.DateOfBirth = this.getEmployeeDetail ? this.formatDate(this.getEmployeeDetail.DateOfBirth, 2) : null
    this.date.IdentityDate = this.getEmployeeDetail ? this.formatDate(this.getEmployeeDetail.IdentityDate, 2) : null
    // Gán giá trị cho radio button ban đầu là option đầu tiên
    let gender = this.getEmployeeDetail ? this.getEmployeeDetail.Gender : 0;
    this.genderValue = gender;
    this.setFormFlagTrue();
  },
  mounted() {
    this.bindingData();
  },

};
</script>
