<template>
  <div :class="[
    'select-box', 
    'select-box-' + drdInfo.name, 
    'select-dropdown-box'
    ]"
    v-click-outside="clickOutSide"
  >
    <button 
      class="btn-select-box btn-dropdown-restaurant"
      @click="toggleDrd()"
    >
      <div class="select-box-icon">
        <i 
          :class="
            drdFlag[drdInfo.flagName] 
             ? 'fas fa-chevron-down'
             : 'fas fa-chevron-up'
          "
        ></i>
      </div>
    </button>
    <input 
      class="select-box-text" 
      v-model="drdValue"
      disabled>
    <div 
      :class="[
        {'hide' : drdFlag[drdInfo.flagName]},
        'dropdown-box', 
        'dropdown-box-' + drdInfo.name,
        ]"
    >
      <div 
        class="dropdown-item"
        v-for="(item, index) in content" 
        :key="index"
      >
        <input 
          type="radio" 
          v-model="drdValue"
          :id="'radio-' + drdInfo.flagName + '-' + index" 
          :name="'radio-' + drdInfo.flagName" 
          @change="input($event)"
          :value="item[drdInfo.name]" 
        >
        <label 
          :for="'radio-' + drdInfo.flagName + '-' + index"
          @click="selectedItem()"
        >
          <span>
              {{ item[drdInfo.name] }}
          </span>
        </label>
      </div>
    </div>
    <div class="bottom-line"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ClickOutside from "vue-click-outside";

export default {
  name: "BaseDropdown",
  emits: ["input"],
  props: {
    drdInfo: Object,
    content: Array,
    inputValue: {
      type: String,
      default: 'Công ty cổ phần'
    },
  },
  data() {
    return {
      drdValue: "",
    }
  },
  directives: {
    ClickOutside
  },
  computed: {
    ...mapState("event", ["drdFlag"])
  },
  methods: {
    ...mapActions("emp", ["setPageNum", "setPageSize"]),
    ...mapActions("event", ["hideDrd"]),
    /**
     * Ẩn hiện dropdown khi click vào button trong dropdown
     * Author: HHDang (16/08/2021)
     */
    toggleDrd() {
      this.$store.dispatch("event/toggleDrd", this.drdInfo.flagName)
    },
    /**
     * Ẩn dropdown khi có 1 option được chọn
     * Author: HHDang (16/08/2021)
     */
    selectedItem() {
      this.toggleDrd();
    },
    /**
     * Emit sự kiện change của input dropdown
     * Author: HHDang (16/08/2021)
     */
    input(e) {
      this.$emit("input", e)
    },
    /**
     * Đóng dropdown khi nhấn ra bên ngoài
     * Author: HHDang (16/08/2021)
     */
    clickOutSide() {
      this.hideDrd(this.drdInfo.flagName);
    }
  },
  created() {
    // Binding dữ liệu ban đầu cho dropdown
    this.drdValue = this.inputValue;
  }
}
</script>

<style lang="css" scoped>
@import url("../../css/common/dropdown.css");
@import url("../../css/common/combobox.css");
</style>