<template>
  <tr @contextmenu.prevent="showMDBtn($event)" @click="empSelected()">
    <td class="out-left-white-16"></td>
    <td class="td-check-box">
      <input
        type="checkbox"
        :id="'checkbox-employee-' + index"
        v-model="checkbox"
        class="cb-input"
      />
      <label :for="'checkbox-employee-' + index">
        <i class="fas fa-check"></i>
      </label>
    </td>
    <td
      v-for="(th, idx) in ths"
      :class="[
        'table-item',
        { center: th.center, right: th.right },
        'td-' + th.fieldName,
      ]"
      :style="sizeTdStyle(th)"
      :key="idx"
    >
      <Skeleton v-if="skeleton" />
      <template v-if="!skeleton">
        {{ formatOption(th.fieldName, employee[th.fieldName], 1) }}
      </template>
    </td>
    <td class="td-function">
      <BaseTableFunction 
        :drdId="employee.EmployeeId"
        :index="index"
      />
    </td>
    <td class="out-right-white-30"></td>
  </tr>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BaseTableFunction from "../../../components/base/BaseTableFunction.vue";
import Skeleton from '../../../components/base/skeleton/Skeleton.vue';
import { FormatFunction } from "../../../js/common";

export default {
  components: { BaseTableFunction, Skeleton },
  name: "EmployeeList",
  emits: ["empSelected", "sizeTdStyle"],
  mixins: [FormatFunction],
  props: {
    employee: {
      type: Object,
    },
    ths: {
      type: Array,
    },
    index: Number,
  },
  data() {
    return {
      checkbox: false,
    };
  },
  computed: {
    ...mapState("emp", ["empDeleteList"]),
    ...mapState("event", ["skeleton"]),
  },
  watch: {
    empDeleteList() {
      const index = this.empDeleteList.indexOf(this.employee.EmployeeId);
      if (index !== -1) {
        this.checkbox = true;
      } else {
        this.checkbox = false;
      }
    },
  },
  methods: {
    ...mapActions("emp", [
      "getEmployeeById",
      "handlerEmpDeleteList",
      "addEmpDeleteList",
    ]),
    /**
     * Hiển thị context menu khi click chuột phải
     * Author: HHDang (17/08/2021)
     */
    showMDBtn(e) {
      this.$store.dispatch("event/showMDBtn", e);
      // Call api lấy thông tin nhân viên theo id
      this.getEmployeeById(this.employee.EmployeeId);
      // this.checkbox = !this.checkbox;
    },
    /**
     * Emit thông tin id của nhân viên để xử lý ở component cha
     * Author: HHDang (17/08/2021)
     */
    empSelected() {
      this.$emit("empSelected", this.employee.EmployeeId)
      // Call api lấy thông tin nhân viên theo id
      // this.getEmployeeById(this.employee.EmployeeId);
    },
    sizeTdStyle(th) {
      this.$emit("sizeTdStyle", th);
    }
  },
};
</script>

<style>
@import url("../../../css/common/grid.css");
@import url("../../../css/common/checkbox.css");
td.center {
  text-align: center !important;
}

td.right {
  text-align: right !important;
}
</style>
