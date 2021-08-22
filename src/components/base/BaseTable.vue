<template>
  <div>
    <table border="0" style="width: 100%"  cellspacing="0">
      <thead>
        <tr>
          <th class="out-left-white-16"></th>
          <th class="th-checkbox">
            <input 
            type="checkbox" 
            :id="'checkbox-employee-all'"
            v-model="checkbox"
            class="cb-input"
          >
          <label :for="'checkbox-employee-all'">
            <i class="fas fa-check"></i>
          </label>
          </th>
          <th 
            v-for="(th, index) in ths" 
            :key="index"
            @click="sortingTable(th.fieldName)"
            :class="['th-' + th.fieldName, {center: th.center, right: th.right}]"
            :style="sizeStyle(th)"
          >
            <span>{{ th.content }}</span>
            <span style="margin-left: 10px">
              <i 
                :class="['fas', sortFlag[th.fieldName] ? 'fa-caret-up' : 'fa-caret-down']"
              >
              </i>
            </span>
          </th>
          <th class="th-function">
            Chức năng
          </th>
          <th class="out-right-white-30"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="notFound && !spinner">
          <td class="out-left-white-16"></td>
          <td class="td-check-box" style="background-color: #fff !important"></td>
          <BaseDataNF />
        </tr>
        <EmployeeList
          v-for="(emp, index) in data"
          :key="emp.EmployeeId"
          :employee="emp"
          :ths="ths"
          :index="index"
          :class="classStyle(emp.EmployeeId) ? 'actived' : ''"
          @empSelected="empSelected($event)"
          @sizeTdStyle="sizeTdStyle($event)"
        />
      </tbody>
      
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EmployeeList from "../../views/dictionary/employee/EmployeeList.vue";
import BaseDataNF from './BaseDataNF.vue';
import {Sorting} from '../../js/sorting'

export default {
  components: {
    EmployeeList,
    BaseDataNF,
  },
  mixins: [Sorting],
  emits: ["cbSelectAll", "sortingTable"],
  props: {
    data: Array,
    sortFlag: Object,
    ths: Array,
    dataDeleteList: Array,
    notFound: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      empId: null,
      flag: true,
      checkbox: false,
      dataSorting: [],
    };
  },
  computed: {
    ...mapState("event", ["spinner", "pageType"]),
  },
  watch: {
    checkbox() {
      this.$emit("cbSelectAll", this.checkbox);
    },
  },
  methods: {
    /**
     * Hàm sắp xếp cho table
     * @param {String} fieldName Tên trường được chọn để xắp xếp
     * Author: HHDang (17/8/2021)
     */
    sortingTable(fieldName) {
      this.$emit("sortingTable", fieldName);
    },
    /**
     * Hàm style cho dòng được chọn trên table
     * @param {String} id id của dòng được chọn
     * @returns Kết quả (true/false)
     * Author: HHDang (17/08/2021)
     */
    classStyle(id) {
      if(this.empId === id) {
        return true;
      } else {
        return false
      }
    },
    /**
     * Hàm lấy giá trị id của dòng được chọn
     * @param {String} id id của dòng được chọn
     * Author: HHDang (17/08/2021)
     */
    empSelected(empSelected) {
      this.empId = empSelected;
    },
    /**
     * Thiết lập max-with, min-width cho các thành phần trong bảng
     * Author: HHDang (22/8/2021)
     */
    sizeStyle(th) {
      let style = {};
      if(th.style) {
        if(th.style.minWidth) {
          style["min-width"] = th.style.minWidth + 'px';
        }
        if(th.style.maxWidth) {
          style["max-width"] = th.style.maxWidth + 'px';
        }
      }
      return style;
    },
    /**
     * Thiết lập max-with, min-width cho các thành phần trong bảng
     * Author: HHDang (22/8/2021)
     */
    sizeTdStyle(th) {
      return this.sizeStyle(th);
    }
  },
};
</script>

<style lang="css" scoped>
@import url("../../css/common/vueanimation.css");

th.center {
  text-align: center !important;
}

th.right {
  text-align: right !important;
}
</style>
