<template>
  <div 
    :class="['table-function-dropdown', {'hidden': flag}]"
    :style="{'top': position.y + 'px', 'left': position.x + 'px'}"
    v-click-outside="clickOutSide"
  >
    <div class="dropdown-btn-list">
      <button 
        class="m-btn-none btn-dropdown-clone"
        @click="btnCloneClick()"
      >
        <span> Nhân bản </span>
      </button>
      <button 
        class="m-btn-none btn-dropdown-delete"
        @click="btnDeleteClick()"
      >
        <span> Xóa </span>
      </button>
      <button 
        class="m-btn-none"
        v-tooltip.bottom="'Tính năng đang phát triển'"
      >
        <span> Ngưng sử dụng </span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { MISAFormMode } from '../../Enums/MISAEnums';
import ClickOutside from "vue-click-outside"

export default {
  name: "BaseTableDropdown",
  emits: ["btnDeleteClick"],
  props: {
    position: {
      type: Object,
      default() {
        return {
          x: 0,
          y: 0
        }
      }
    },
    flag: {
      type:Boolean,
      default: true
    }
  },
  directives: {
    ClickOutside,
  },
  computed: {
    ...mapState("event", ["formMode"]),
  },
  methods: {
    ...mapActions("event", [
      "toggleDialog",
      "hideDrd"
    ]),
    /**
     * Hàm xử lý khi nhấn nút nhân bản
     * Author: HHDang (19/08/2021)
     */
    btnCloneClick() {
      // Chuyển trạng thái form sang thêm mới
      this.formMode.status = MISAFormMode.Save;
      // Mở form nhập liệu
      this.toggleDialog();
      // Đóng dropdown của table
      this.hideDrd("table");
    },
    /**
     * Hàm xử lý khi nhất nút xóa
     * Author: HHDang (19/08/2021)
     */
    btnDeleteClick() {
      // Đóng dropdown của table
      this.hideDrd("table");
      // Khai báo custom function để xử lý bên ngoài
      this.$emit("btnDeleteClick")
    },
    /**
     * Khi ấn ra ngoài thì ẩn dropdown
     * Author: HHDang (19/08/2021)
     */
    clickOutSide() {
      this.hideDrd("table");
    }
  }
};
</script>

<style lang="css" scoped>
@import url("../../css/common/tablefunction.css");
@import url("../../css/common/button.css");
</style>
