<template>
  <div
    :class="[
      cbxInfo.type == 'formadd' ? 'formadd-select-box' : 'select-box',
      {'border-red': !formFlag[cbxInfo.ref]}
    ]"
    v-click-outside="clickOutSide"
  >
    <div class="tooltip-container">
      <button class="btn-select-box btn-combobox-restaurant" @click="toggleCbx()">
        <div class="select-box-icon">
          <!-- <i
            :class="
              cbxFlag[cbxInfo.flagName]
              ? 'fas fa-chevron-down'
              : 'fas fa-chevron-up'
            "
          ></i> -->
          <div 
            :class="[
            'mi mi-16 mi-arrow-dropdown',
            cbxFlag[cbxInfo.flagName]
              ? 'arrow-dropdown--close'
              : 'arrow-dropdown--open'
            ]"
          >
          </div>
        </div>
      </button>
      <input
        :ref="cbxInfo.ref"
        v-model="cbxValue"
        @blur="cbxBlur()"
        class="select-box-text"
        @input="filterCbx()"
        @keyup="keyup($event)"
        @keyup.tab="showCbx(cbxInfo.flagName)"
        @keydown.tab="hideCbx(cbxInfo.flagName)"
        :tabindex="cbxInfo.tabindex"
        :disabled="cbxInfo.name === 'pagination'"
        @mouseover="mouseOver($event)"
      />
      <span 
        class="tooltiptext"
        v-show="!formFlag[cbxInfo.ref]"
        :style="{'top': mousePosition.y + 'px', 'left': mousePosition.x + 'px'}"
      >
        {{ tooltipText }}
      </span>
    </div>
    
    <!-- <button :class="['btn-reset', 
        cbxValue == '' ? 'hide' : '']"
        @click="resetInput()"
      >
        <i class="fas fa-times"></i>
      </button> -->

    <div
      :class="[
        { hide: cbxFlag[cbxInfo.flagName] },
        'combobox-box',
        'combobox-box-' + cbxInfo.flagName.toLowerCase(),
      ]"
    >
      <div
        class="combobox-item"
        v-for="(item, index) in contentFilter"
        :key="index"
      >
        <input
          type="radio"
          v-model="cbxValue"
          :id="'radio-' + cbxInfo.flagName + '-' + index"
          :name="'radio-' + cbxInfo.flagName"
          :value="item[cbxInfo.name]"
          @change="input($event)"
        />
        <label
          :for="'radio-' + cbxInfo.flagName + '-' + index"
          @click="selectedItem($event)"
        >
          <span>
            {{ item[cbxInfo.name] }}
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../../css/common/input.css");
@import url("../../css/common/combobox.css");
@import url("../../css/common/button.css");
</style>

<script>
import { mapActions, mapState } from "vuex";
import { validateForm } from "../../js/validate";
import { Pagination } from "../../js/pagination";
import { HandlerTooltip } from "../../js/tooltip"
import { DisplayName, Validate} from "../../resources/MISAConst"
import ClickOutside from "vue-click-outside";

export default {
  name: "BaseCombobox",
  emits: ["cbxFilter", "input"],
  props: {
    cbxInfo: Object,
    content: Array,
    inputValue: String,
  },
  mixins: [validateForm, Pagination, HandlerTooltip],
  directives: {
    ClickOutside,
  },
  data() {
    return {
      cbxValue: "",
      contentFilter: [],
      cbxIndex: -1,
      scrollWindow: 0,
      mousePosition: {
        x: 0,
        y: 0
      },
      tooltipText: "Tên đơn vị không được phép để trống"
    };
  },
  watch: {
    content() {
      this.contentFilter = [...this.content];
    },
    cbxValue() {
      this.$emit("cbxFilter", this.cbxValue);
    },
  },
  computed: {
    ...mapState("event", ["cbxFlag", "formFlag"]),
  },
  methods: {
    
    ...mapActions("event", ["showCbx", "hideCbx", "setCbxFlagTrue"]),
    ...mapActions("emp", ["addFormRef"]),
    /**
     * Đóng combobox khi click ra ngoài
     * Author: HHDang (16/08/2021)
     */
    clickOutSide() {
      this.setCbxFlagTrue(this.cbxInfo.flagName);
    },
    /**
     * Ẩn hiện combobox và focus vào thẻ input của cbx
     * Author: HHDang (16/08/2021)
     */
    toggleCbx: function() {
      this.$refs[this.cbxInfo.ref].focus();

      this.$store.dispatch("event/toggleCbx", this.cbxInfo.flagName);
      this.$nextTick(function() {
        const box = document.querySelector(`.combobox-box-${this.cbxInfo.flagName.toLowerCase()}`)
        // Thực hiện quay combobox lên trên khi combobox ở cuối trang
        if(  this.cbxInfo.flagName == "pagination") {
          box.style.top = `-${box.clientHeight + 10}px`;
        }
      })
      
    },
    /**
     * Ẩn combobox khi có 1 trường được chọn
     * Author: HHDang (16/08/2021)
     */
    selectedItem: function() {
      this.toggleCbx();
    },
    /**
     * Lấy giá trị input hiện tại khi blur để validate dữ liệu
     * Author: HHDang (16/08/2021)
     */
    cbxBlur: function() {
      this.formFlag[this.cbxInfo.ref] = this.validateOption(
        this.cbxInfo.ref,
        this.$refs[this.cbxInfo.ref].value
      );
      // Hiển thị tooltip thông báo nếu dữ liệu nhập không hợp lệ
      if(this.$refs[this.cbxInfo.ref].value.trim() == '') {
        this.tooltipText = `${DisplayName[this.cbxInfo.ref]} ${Validate.Required}`;
        return;
      }
      // Hiển thị tooltip thông báo nếu dữ liệu nhập không hợp lệ
      if(!this.formFlag[this.cbxInfo.ref]) {
        this.tooltipText = `${DisplayName[this.cbxInfo.ref]} ${Validate.NotExist}`;
      }
    },
    /**
     * Xóa giá trị input hiện lại
     * Author: HHDang (16/08/2021)
     */
    resetInput: function() {
      this.cbxValue = "";
      this.contentFilter = this.content;
      this.$refs[this.cbxInfo.ref].focus();
    },
    /**
     * Hàm lọc các options trong cbx
     * Author: HHDang (16/08/2021)
     */
    filterCbx: function() {
      this.cbxIndex = -1;
      if (this.cbxValue) {
        // Thực hiện lọc khi người dùng nhập liệu vào cbx
        this.contentFilter = this.content.filter((item) => {
          return item[this.cbxInfo.name]
            .toLowerCase()
            .includes(this.cbxValue.toLowerCase());
        });
        // Hiển thị các option nếu có trường phù hợp
        this.showCbx(this.cbxInfo.flagName);
        // Đóng các option nếu không có trường phù hợp
        if (!this.contentFilter.length) {
          this.hideCbx(this.cbxInfo.flagName);
        }
      } else {
        // Nếu dữ liệu nhập vào trống thì đóng combobox và reset mảng
        this.contentFilter = this.content;
        this.hideCbx(this.cbxInfo.flagName);
      }
    },
    /**
     * Xử lý sự kiện khi người dùng nhập liệu vào combobox
     * Author: HHDang (16/08/2021)
     */
    keyup(e) {
      const box = document.querySelector(`.combobox-box-${this.cbxInfo.flagName.toLowerCase()}`)
      // Xử lý khi combobox ở cuối trang để các option quay lên trên
      if(this.cbxInfo.flagName === "pagination" && box.clientHeight !== 0) {
        box.style.top = `-${box.clientHeight + 10}px`;
      }
      let item;
      if (!this.cbxFlag[this.cbxInfo.flagName]) {
        // Khi nhấn phím xuống thì di chuyển lựa chọn xuống
        if (e.keyCode === 40) {
          this.cbxIndex++;
          if (this.cbxIndex === this.contentFilter.length) this.cbxIndex = 0;
          item = document.getElementById(
            `radio-${this.cbxInfo.flagName}-${this.cbxIndex}`
          );
          if (item) {
            item.checked = true;
          }
          this.handlerScrollbar(box, item)
        }
        // Khi nhấn phím lên thì di chuyển lựa chọn lên
        if (e.keyCode === 38) {
          this.cbxIndex--;
          if (this.cbxIndex < 0)
            this.cbxIndex = this.contentFilter.length - 1;
          item = document.getElementById(
            `radio-${this.cbxInfo.flagName}-${this.cbxIndex}`
          );
          if (item) {
            item.checked = true;
          }
          this.handlerScrollbar(box, item)
        }
        // Khi nhấn phím enter thì chọn và lưu giá trị
        if (e.keyCode === 13) {
          item = document.querySelector(
            `input[name=radio-${this.cbxInfo.flagName}]:checked`
          );
          // console.log(item)
          if (item) {
            this.cbxValue = item.value;
            this.hideCbx(this.cbxInfo.flagName);
          }
        }
      }
    },
    /**
     * Scroll combobox theo item được chọn
     * Author: HHDang (16/08/2021)
     */
    handlerScrollbar(box, item) {
      const window = parseInt(((this.cbxIndex + 1) * item.nextElementSibling.clientHeight) / box.clientHeight)
      if(window != this.scrollWindow) {
        this.scrollWindow = window;
        box.scrollTop = window * box.clientHeight;
      }
    },
    /**
     * Emit sự kiện change của input
     * Author: HHDang (16/08/2021)
     */
    input(e) {
      this.$emit("input", e)
    },
    /**
     * lấy vị trí con trỏ chuột
     * Author: HHDang (16/08/2021)
     */
    mouseOver(position) {
      this.mousePosition = this.getMousePosition(position);
    } 
  },
  created() {
    // Binding dữ liệu cho combobox
    this.contentFilter = [...this.content];
    this.cbxValue = this.inputValue;
  },
  mounted() {
    // Khởi tạo ref cho combobox
    let ref = {
      name: this.cbxInfo.ref,
      info: this.$refs[this.cbxInfo.ref],
    };
    this.addFormRef(ref);
  },
};
</script>
