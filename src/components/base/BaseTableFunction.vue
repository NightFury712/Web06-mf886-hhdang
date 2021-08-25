<template>
  <div class="table-function">
    <div class="table-dropdown">
      <button 
        class="m-btn-none m-btn-modify"
        @click="modifyClick()"
      >
        <span>Sửa</span>
      </button>
      <button 
        :class="['m-btn-none m-btn-dropdown', 'btn-index-' + index]" 
        @click="showTableDrd()"
      >
        <div class="btn-arrow-container">
          <div class="mi mi-16 mi-arrow-up--blue"></div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { MISAFormMode } from '../../enumerables/MISAEnums';
import {Toast} from "../../js/toast"

export default {
  name: "BaseTableFunction",
  mixins: [Toast],
  props: {
    drdId: String,
    index: Number
  },
  computed: {
    ...mapState("event", ["tableDrdId", "drdFlag", "formMode"]),
  },
  methods: {
    ...mapActions("event", [
      "setTableDrbPosition",
      "setTableDrdId",
      "showDrd",
      "hideDrd",
      "toggleDialog",
      "showSpinner",
      "hideSpinner"
    ]),
    ...mapActions("emp", [
      "getEmployeeById",
    ]),
    /**
     * Hiển thị dropdown cho table
     * Author: HHDang (16/08/2021)
     */
    async showTableDrd() {
      // Lấy thông tin nhân viên theo Id
      const res = await this.getEmployeeById(this.drdId);
      // Thông báo lỗi (nếu có) bằng toast 
      this.initErrorToast(res);
      if (this.tableDrdId !== this.drdId) {
        // Lấy vị trí để hiển thị dropdown
        const info = document.querySelector(`.table-dropdown .btn-index-${this.index}`).getBoundingClientRect();
        const position = {
          x: info.x - 70,
          y: info.y + 30,
        };
        this.setTableDrbPosition(position);
        this.setTableDrdId(this.drdId);
        this.showDrd("table")
      } else {
        if(this.drdFlag.table) {
          this.showDrd("table")
        } else {
          this.hideDrd("table")
        }
      }
    },
    /**
     * Hiển thị form sửa thông tin nhân viên
     * Author: HHDang (16/08/2021)
     */
    async modifyClick() {
      // Chuyển trạng thái form sang sửa
      this.formMode.status = MISAFormMode.Update;
      this.showSpinner();
      // Lấy thông tin nhân viên theo Id
      const res = await this.getEmployeeById(this.drdId);
      // Thông báo lỗi (nếu có) bằng toast 
      this.initErrorToast(res);
      this.hideSpinner();
      this.toggleDialog();
    },
  },
};
</script>

<style lang="css" scoped>
@import url("../../css/common/button.css");
@import url("../../css/common/tablefunction.css");
</style>
