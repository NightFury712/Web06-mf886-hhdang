<template>
  <div>
    <BasePopupWarning :popupInfo="popupInfo" @btnSaveClick="btnSaveClick"/>
    <BasePopupWarning :popupInfo="popupDelManyInfo" @btnSaveClick="deleteMany"/>
    <div class="content" :class="{ left_68: $store.state.event.sidebarFlag }">
      <div class="header-content">
        <div class="title">Danh sách nhân viên</div>
        <div class="content-feature">
          <BaseButton
            @btnClick="toggleDialog()"
            :btnStyle="btnStyle"
          />
        </div>
      </div>
      <div class="filter-bar">
        <div class="filter-left">
          <i class="fas fa-search"></i>
          <input
            class="input-search"
            style="width: 250px;"
            type="text"
            placeholder="Tìm kiếm theo Mã, Tên nhân viên"
            v-model="inputData"
            @keyup.enter="inputSearch()"
          />
        </div>
        <!-- <BaseCombobox :cbxInfo="cbxDepartment" :content="departmentArr" :inputValue="'Tất cả phòng ban'"/>
        <BaseCombobox :cbxInfo="cbxPosition" :content="positionArr" :inputValue="'Tất cả vị trí'"/> -->
        <div clasv class="filter-right">
          <button :class="['m-btn-trash m-second-button', {'hide': btnTrashFlag}]" @click="showPopupDel()">
            <i class="far fa-trash-alt"></i>
          </button>
          <button class="m-btn-refresh m-second-button" @click="reload()">
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
      <div class="grid grid-employee">
        <BaseTable 
          :data="dataSorting" 
          :sortFlag="ctmSortFlag"
          :ths="ctmThs"
          :notFound="ctmNotFound"
          :dataDeleteList="ctmDeleteList"
          @cbSelectAll="cbSelectAll($event)"
          @sortingTable="sortingTable($event)"
        />
      </div>
      <BasePagination 
        :pagingArray="ctmPageArr"
        :pageInfomation="ctmPageInfo"
        @inputPageNum="inputPageNum($event)"
        @input="inputPageSize($event)"
      />
    </div>
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
import { mapActions, mapState } from 'vuex';
import BaseButton from "../base/BaseButton.vue";
// import BaseCombobox from '../base/BaseCombobox.vue';
import BasePopupWarning from '../base/BasePopupWarning.vue';
import BaseTable from "../base/BaseTable.vue";
import {Toast} from "../../js/toast"
import {Pagination} from "../../js/pagination"
import { Sorting } from "../../js/sorting"
import BasePagination from '../base/BasePagination.vue';
import { MISAPage } from '../../Enums/MISAEnums';

export default {
  name: "ThePageCustomer",
  mixins: [Toast, Pagination, Sorting],
  components: {
    BaseTable,
    BaseButton,
    // BaseCombobox,
    BasePopupWarning,
    BasePagination,
  },
  data() {
    return {
      btnStyle: {
        icon: "fas fa-user-plus",
        text: "Thêm nhân viên",
      },
      // cbxDepartment: {
      //   type: '',
      //   name: 'DepartmentName',
      //   ref: 'departmentFilter',
      //   flagName: 'department',
      // },
      // cbxPosition: {
      //   type: '',
      //   ref: 'positionFilter',
      //   name: 'PositionName',
      //   flagName: 'position',
      // },
      popupInfo: {
        title: "Xóa khách hàng",
        content: `Bạn có chắc muốn "xóa khách hàng" hay không?`,
        flagName: "delete",
        btnCancel: {
          text: "Hủy",
          className: "btn-cancel",
        },
        btnSave: {
          text: "Xóa",
          className: "btn-save btn-delete"
        },
      },
      popupDelManyInfo: {
        title: "Xóa khách hàng",
        content: `Bạn có chắc muốn "xóa các khách hàng này" hay không?`,
        flagName: "deleteMany",
        btnCancel: {
          text: "Hủy",
          className: "btn-cancel",
        },
        btnSave: {
          text: "Xóa",
          className: "btn-save btn-delete"
        },
      },
      ctmThs: [
        { fieldName: "CustomerCode", content: "Mã khách hàng" },
        { fieldName: "FullName", content: "Họ và tên" },
        { fieldName: "Gender", content: "Giới tính" },
        { fieldName: "DateOfBirth", content: "Ngày sinh" },
        { fieldName: "Address", content: "Địa chỉ" },
        { fieldName: "Email", content: "Email" },
        { fieldName: "PhoneNumber", content: "Số điện thoại" },
        { fieldName: "CompanyName", content: "Tên công ty" },
        { fieldName: "IsStopFollow", content: "Tình trạng theo dõi" },
      ],
      // departmentArr: [],
      // positionArr: [],
      btnTrashFlag: true,
      inputData: '',
      dataSorting: [],
    };
  },
  watch: {
    ctmDeleteList() {
      if(!this.ctmDeleteList.length) {
        this.btnTrashFlag = true;
      } else {
        this.btnTrashFlag = false;
      }
    },
    customer() {
      if(this.customer) {
        this.popupInfo.content = `Bạn có chắc muốn xóa nhân viên ${this.customer.CustomerCode} hay không?`
      }
    },
    customers() {
      this.dataSorting = this.customers;
    }
  },
  computed: {
    ...mapState(
      'ctm', 
      [
        "newCustomerCode",
        "ctmPageInfo",
        "ctmPageArr",
        "customer",
        "ctmDeleteList",
        "customers",
        "ctmSortFlag",
        "ctmNotFound"
      ]),
    ...mapState("event", ["formMode"]),
  },
  methods: {
    ...mapActions("ctm", [
      "setCustomerFilter", 
      "setCustomer", 
      "setCtmPageInfo", 
      "delete", 
      "clearCtmDeleteList",
      "handlerCtmDeleteList",
      "toggleCtmSortFlag"

    ]),
    ...mapActions("event", ["togglePopup", "setPageType", "showSpinner", "hideSpinner"]),
    
    // Hiển thị form thêm nhân viên
    toggleDialog: async function() {
      this.setCustomer(null)
      // await this.getNewEmployeeCode();
      // this.formRef.EmployeeCode.value = this.newEmployeeCode;
      this.formMode.status = 0;
      this.$store.dispatch("event/toggleDialog");
    },
    // Click btn xóa của popup
    btnSaveClick: async function() {
      await this.delete(this.customer.CustomerId);
      this.getCtmFilterPaging();
      this.toast({
        message: "Xóa nhân viên thành công!",
        type: 'success',
        duration: 2000
      })
      this.togglePopup(this.popupInfo.flagName);
    },

    // Hiển thị popup thông báo xóa
    showPopupDel() {
      this.togglePopup(this.popupDelManyInfo.flagName);
    },
    // Xóa nhiều bản ghi
    async deleteMany() {
      this.ctmDeleteList.forEach(async (item) => {
        await this.delete(item);
      })
      setTimeout(async() => {
        await this.getCtmFilterPaging();
      }, 200)
      this.toast({
        message: "Xóa nhân viên thành công!",
        type: 'success',
        duration: 2000
      })
      this.togglePopup(this.popupDelManyInfo.flagName);
      this.clearCtmDeleteList();
    },
    inputSearch() {
      if(this.inputData == '') {
        this.setCustomerFilter('kh');
        this.getCtmFilterPaging();
      } else {
        this.setCustomerFilter(this.inputData);
        this.getCtmFilterPaging();
      }
    },
    reload() {
      this.showSpinner();
      this.getCtmFilterPaging();
      setTimeout(() => {
        this.hideSpinner();
      }, 300)
    },
    async inputPageSize(e) {
      this.setCtmPageInfo({name: "pageSize", data: parseInt(e.target.value.split(" ")[0])});
      this.setCtmPageInfo({name: "pageIndex", data: 0});
      await this.getCtmFilterPaging();
    },
    async inputPageNum(value) {
      this.setCtmPageInfo({name: "pageIndex", data: value})
      await this.getCtmFilterPaging();
    },
    cbSelectAll(value) {
      this.clearCtmDeleteList();
      if(value) {
        this.customers.forEach((item) => {
          this.handlerCtmDeleteList(item.CustomerId);
        })
      }
    },
    sortingTable(fieldName) {
      this.dataSorting = this.sortTable([...this.customers], fieldName);
      this.toggleCtmSortFlag(fieldName);
      if(!this.ctmSortFlag[fieldName]) {
        this.dataSorting = this.dataSorting.reverse();
      }
    },
  },
  async created() {
    this.setPageType(MISAPage.Customer);
    this.setCtmPageInfo({name: "pageIndex", data: 0})
    this.setCtmPageInfo({name: "pageSize", data: 10})
    this.showSpinner();
    await this.getCtmFilterPaging();
    this.hideSpinner();
    this.setPageType(MISAPage.Customer);
  },
};
</script>
