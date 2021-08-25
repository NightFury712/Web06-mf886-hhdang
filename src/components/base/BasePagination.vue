<template>
  <div class="paging-bar" v-show="isShow()">
    <div class="paging-numtotal">
      Tổng số: <b>{{ pageInfomation.totalRecord }}</b> bản ghi
    </div>

    <div class="paging-current-numtotal">
      <BaseCombobox
        :cbxInfo="combobox"
        :content="content"
        :inputValue="content[0].pagination"
        @input="inputChange($event)"
        style="width: 200px !important"
      />
      <div class="pagination">
        <button
          class="pre-page"
          @click="movePre()"
          :disabled="pageInfomation.pageIndex === 0"
        >
          <span>Trước</span>
        </button>
        <div class="page-number">
          <div v-for="(item, index) in pagingArray" :key="index">
            <input
              type="radio"
              name="radio-paging"
              :id="'radio-' + index"
              class="hide"
              v-model="radioInput"
              :value="item + 1"
              :disabled="item === -1"
            />
            <label :for="'radio-' + index" class="page-number-item">{{
              item === -1 ? "..." : item + 1
            }}</label>
          </div>
        </div>

        <button
          class="next-page"
          @click="moveNext()"
          :disabled="pageInfomation.pageIndex === pageInfomation.totalPage - 1"
        >
          <span>Sau</span>
        </button>
        <!-- <button class="last-page" @click="moveToLast()"></button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Pagination } from "../../js/pagination";
import { Combobox } from "../../resources/MISAConst";
import BaseCombobox from "./BaseCombobox.vue";
// import BaseDropdown from './BaseDropdown.vue';

export default {
  components: {
    // BaseDropdown,
    BaseCombobox,
  },
  name: "BasePagination",
  mixins: [Pagination],
  emits: ["input", "inputPageNum"],
  props: {
    pageInfomation: Object,
    pagingArray: Array,
  },
  data() {
    return {
      radioInput: 1,
      currentPageSize: null,
      drdInfo: {
        ref: "pagesize",
        name: "pagesize",
        flagName: "pagesize",
      },
      combobox: {
        type: "",
        name: "pagination",
        ref: "pagination",
        flagName: "pagination",
      },
      content: [
        { pagination: Combobox.Pagination.format(10) },
        { pagination: Combobox.Pagination.format(20) },
        { pagination: Combobox.Pagination.format(30) },
        { pagination: Combobox.Pagination.format(50) },
        { pagination: Combobox.Pagination.format(100) },
      ],
    };
  },
  watch: {
    /**
     * emit giá trị trang hiện tại được chọn để xử lý phân trang
     * Author: HHDang (18/08/2021)
     */
    radioInput() {
      this.$emit("inputPageNum", parseInt(this.radioInput) - 1);
    },
    /**
     * Theo dõi giá trị object 'pageInfomation'
     * Khi trang được chọn quay về trang đầu thì checked vào radio button số 1
     * Author: HHDang (18/08/2021)
     */
    pageInfomation: {
      handler(val) {
        if (val.pageIndex === 0) {
          this.radioInput = 1;
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions("event", ["showSpinner", "hideSpinner"]),
    /**
     * Hàm xử lý khi nhấn nút 'Trước' (Trang hiện tại - 1)
     * Author: HHDang (18/08/2021)
     */
    movePre() {
      this.radioInput = parseInt(this.radioInput) - 1;
    },
    /**
     * Hàm xử lý khi nhấn nút 'Sau' (Trang hiện tại + 1)
     * Author: HHDang (18/08/2021)
     */
    moveNext() {
      this.radioInput = parseInt(this.radioInput) + 1;
    },
    /**
     * Emit giá trị kích thước trang để xử lý phân trang
     * Author: HHDang (18/08/2021)
     */
    inputChange(e) {
      this.$emit("input", e);
    },
    /**
     * Hàm xử lý ẩn thanh Pagination khi không có dữ liệu
     * Author: HHDang (18/08/2021)
     */
    isShow() {
      if(!this.pageInfomation.totalRecord) {
        return false;
      } 
      if(this.pageInfomation.totalRecord === 0) {
        return false;
      }
      return true;
    }
  },
  created() {
    this.currentPageSize = this.pageInfomation.pageSize;
  },
};
</script>

<style></style>
