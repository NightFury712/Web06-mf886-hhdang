<template>
  <div>
    <EmployeeDetail v-if="dialogFlag"/>
    <BasePopupInfo 
      :popup="popupInfo"
      v-if="popupFlag.delete"
      @btnSaveClick="btnSaveClick"
    />
    <div class="content" :class="{ left_68: $store.state.event.sidebarFlag }">
      
      <div class="header-content">
        <div class="title">Nhân viên</div>
        <div class="content-feature">
          <BaseButton
            @btnClick="toggleDialog()"
            :btnStyle="btnStyle"
            :isShow="loadingBtn.add"
          />
        </div>
      </div>
      <div class="layout-dictionary-body">
        <div class="filter-bar">
          <div clasv class="filter-right">
            <div 
              class="ms-con-input"
              v-tooltip.bottom="'Tìm kiếm nhân viên'"
            >
              <input
                class="input-search"
                style="width: 240px;"
                type="text"
                placeholder="Tìm kiếm theo Mã, Tên nhân viên"
                v-model="inputData"
                @keyup.enter="inputSearch()"
              />
              <div class="mi mi-24 mi-search input-search-icon"></div>
            </div>
            
            <!-- <button :class="['m-btn-trash m-second-button', {'hide': btnTrashFlag}]" @click="showPopupDel()">
              <i class="far fa-trash-alt"></i>
            </button> -->
            <button 
              class="m-btn-refresh" 
              @click="reload()"
              v-tooltip.bottom="'Cập nhật dữ liệu'"
            >
              <div class="mi mi-24 mi-refresh"></div>
            </button>
          </div>
        </div>
        <div class="grid grid-employee">
          <BaseTable 
            :data="dataSorting" 
            :sortFlag="sortFlag"
            :ths="empThs"
            :notFound="notFound"
            :dataDeleteList="empDeleteList"
            @cbSelectAll="cbSelectAll($event)"
            @sortingTable="sortingTable($event)"
          />
        </div>
        <BasePagination  
          :pagingArray="pageArr"
          :pageInfomation="pageInfo"
          @inputPageNum="inputPageNum($event)"
          @input="inputPageSize($event)"
        />
      </div>
    </div>
    <BaseTableDropdown 
      :flag="drdFlag.table"
      :position="tableDrdPosition"
      @btnDeleteClick="btnDeleteClick"
    />
  </div>
</template>

<style lang="css" scoped>
@import url("../../css/common/grid.css");
@import url("../../css/common/content.css");
@import url("../../css/common/toolbar.css");
@import url("../../css/common/common.css");

.left_68 {
  left: 68px !important;
}
</style>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import BaseButton from "../base/BaseButton.vue";
import BaseTable from "../base/BaseTable.vue";
import {Toast} from "../../js/toast"
import {Pagination} from "../../js/pagination"
import {FormatFunction} from "../../js/common"
import {Sorting} from "../../js/sorting"
import BasePagination from '../base/BasePagination.vue';
import {  MISAFormMode } from '../../Enums/MISAEnums'
import { Popup } from '../../resources/MISAConst'
import EmployeeDetail from '../../views/dictionary/employee/EmployeeDetail.vue';
import BaseTableDropdown from '../base/dropdown/BaseTableDropdown.vue';
// import BaseSpinner from '../base/BaseSpinner.vue';
import BasePopupInfo from '../base/popup/BasePopupInfo.vue';

export default {
  name: "ThePage",
  mixins: [Toast, Pagination, FormatFunction, Sorting],
  components: {
    BaseTable,
    BaseButton,
    BasePagination,
    EmployeeDetail,
    BaseTableDropdown,
    // BaseSpinner,
    BasePopupInfo,
  },
  data() {
    return {
      btnStyle: {
        icon: "fas fa-user-plus",
        text: "Thêm mới nhân viên",
      },
      popupInfo: {
        icon: Popup.Warning.icon,
        title: Popup.Warning.title,
        flagName: "delete",
        btnContinue: {
          flag: true,
          title: "Không"
        },
        btnClose: {
          flag: false,
          title: "No"
        },
        btnSave: {
          flag: true,
          title: "Có"
        },
      },
      empThs: [
        { fieldName: "EmployeeCode", content: "Mã nhân viên", style: { minWidth: 150}},
        { fieldName: "EmployeeName", content: "Tên nhân viên", style: { minWidth: 250} },
         
        { fieldName: "Gender", content: "Giới tính", style: { minWidth: 120} },
        {
          fieldName: "DateOfBirth",
          content: "Ngày sinh",
          center: true,
          style: { minWidth: 150}
        },
        { fieldName: "PhoneNumber", content: "Số điện thoại", style: { minWidth: 150}},
        { fieldName: "IdentityNumber", content: "Số CMND", style: { minWidth: 200}},
        { fieldName: "EmployeePosition", content: "Chức danh", style: { minWidth: 200}},
        { fieldName: "DepartmentId", content: "Tên đơn vị", style: { minWidth: 200}},
        { fieldName: "BankAccountNumber", content: "Số tài khoản", style: { minWidth: 150}},
        {
          fieldName: "BankName",
          content: "Tên ngân hàng",
          style: { minWidth: 200}
        },
        { fieldName: "BankBranchName", content: "Chi nhánh TK ngân hàng" },
        { fieldName: "Address", content: "Địa chỉ" },
      ],
      departmentArr: [],
      positionArr: [],
      btnTrashFlag: true,
      inputData: '',
      dataSorting: [],
    };
  },
  watch: {
    // Theo dõi giá trị của mảng nv được chọn để xóa
    empDeleteList() {
      // Nếu mảng khác rỗng thì hiển thị nút xóa
      if(!this.empDeleteList.length) {
        this.btnTrashFlag = true;
      } else {
        this.btnTrashFlag = false;
      }
    },
    employees() {
      this.dataSorting = this.employees;
    }
  },
  computed: {
    ...mapState(
      'emp', 
      [
        "newEmployeeCode",
        "empDeleteList",
        "pageArr",
        "pageInfo",
        "employee",
        "employees",
        "sortFlag",
        "notFound"
      ]),
    ...mapState("event", [
      "formMode",
      "dialogFlag", 
      "loadingBtn", 
      "drdFlag",
      "tableDrdPosition",
      "popupFlag",
    ]),
    ...mapGetters('emp', ["getEmployeeDetail"])
  },
  methods: {
    ...mapActions("emp", [
      "delete", 
      "setEmployee", 
      "getNewEmployeeCode",
      "loadDataDepartment",
      "clearDeleteList",
      "setEmployeeFilter", 
      "setPageNum", 
      "setPageSize", 
      "setPositionFilter",
      "handlerEmpDeleteList",
      "toggleSortFlag"
    ]),
    ...mapActions("event", [
      "togglePopup", 
      "showSpinner", 
      "hideSpinner",
      "showLoadingBtn",
      "hideLoadingBtn",
      "showDrd",
      "hideDrd",
      "showSkeleton", 
      "hideSkeleton",
    ]),
    
    // Hiển thị form thêm nhân viên
    toggleDialog: async function() {
      this.setEmployee(null)
      this.showLoadingBtn("add");
      // Call api lấy mã nhân viên mới
      // await this.getNewEmployeeCode();
      this.hideLoadingBtn("add");
      // Chuyển trạng thái form thành thêm mới
      this.formMode.status = MISAFormMode.Save;
      // Hiển thị form thêm nhân viên
      this.$store.dispatch("event/toggleDialog");
    },
    // Click btn xóa của popup
    btnSaveClick: async function() {
      this.showSpinner();
      // Call api xóa nhân viên
      const statusCode = await this.delete(this.getEmployeeDetail.EmployeeId);
      this.hideSpinner();
      // Load lại dữ liệu
      this.getPageNum();
      // Hiển thị thông báo
      if(statusCode === 200) {
        // Thành công
        this.toast({
          message: "Xóa nhân viên thành công!",
          type: 'success',
          duration: 2000
        })
      } else {
        // Thất bại
        this.toast({
          message: "Đã có lỗi xảy ra khi xóa bản ghi!",
          type: 'error',
          duration: 2000
        })
      }
    },

    // Hiển thị popup thông báo xóa
    showPopupDel() {
      this.popupDelManyInfo.content = `Bạn có chắc muốn xóa ${this.empDeleteList.length} nhân viên này hay không?`;
      this.togglePopup(this.popupDelManyInfo.flagName);
    },
    // Hàm lọc dữ liệu tìm kiếm
    async inputSearch() {
      let data = this.inputData.trim();
      this.showSkeleton();
      this.setPageNum(0);
      if(data == '') {
        this.setEmployeeFilter('nv');
        await this.getPageNum();
      } else {
        this.setEmployeeFilter(data);
        await this.getPageNum();
      }
      this.hideSkeleton();
    },
    // Hàm load lại dữ liệ khi nhấn nút reload
    async reload() {
      this.showSkeleton();
      await this.getPageNum();
      this.hideSkeleton();
    },
    // Hàm filter khi chọn số lượng bản ghi/trang
    async inputPageSize(e) {
      this.setPageSize(parseInt(e.target.value.split(" ")[0]));
      this.setPageNum(0);
      this.showSkeleton();
      await this.getPageNum();
      this.hideSkeleton();
    },
    // Hàm filter khi chọn số trang
    async inputPageNum(value) {
      this.showSkeleton();
      this.setPageNum(value)
      await this.getPageNum();
      this.hideSkeleton();
    },
    cbSelectAll(value) {
      this.clearDeleteList();
      if(value) {
        this.employees.forEach((item) => {
          this.handlerEmpDeleteList(item.EmployeeId);
        })
      }
    },
    sortingTable(fieldName) {
      this.dataSorting = this.sortTable([...this.employees], fieldName);
      this.toggleSortFlag(fieldName);
      if(!this.sortFlag[fieldName]) {
        this.dataSorting = this.dataSorting.reverse();
      }
    },
    /**
     * Thay đổi title popup và hiển thị popup xóa
     * Author: HHDang (18/08/2021)
     */
    btnDeleteClick() {
      this.popupInfo.title = `Bạn có chắc muốn xóa nhân viên <${this.employee.EmployeeCode}> hay không?`
      this.togglePopup(this.popupInfo.flagName);
    },
  },
  async created() {
    // Khởi tạo thông tin phân trang ban đầu
    this.setPageNum(0);
    this.setPageSize(10);
    // Hiển thị loading cho trang khi call api
    this.showSpinner();
    // Call api phân trang nhân viên
    await this.getPageNum();
    // Ẩn loading khi call api thành công
    // if(response) {
    //   if(response.MISACode === MISACode.Exception) {
    //     this.toast({
    //       message: response.Messenger,
    //       type: 'error',
    //       duration: 2000
    //     });
    //   } else {
    //     }
    // }
        this.hideSpinner();
    // Call api lấy dữ liệu phòng ban
    await this.loadDataDepartment();

  },
};
</script>
