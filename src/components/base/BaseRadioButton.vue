<template>
  <label 
    :for="radioInfo.id" 
    class="radio"
    :tabindex="radioInfo.tabindex"
    @keyup.enter="radioSeleted()"
  >
    <input
      type="radio"
      :name="radioInfo.name"
      :id="radioInfo.id"
      class="radio-input"
      :value="radioInfo.value"
      v-model="data"
      @change="radioInput($event)"
    />
    <div class="radio-radio"></div>
    <span class="radio-title">{{ radioInfo.title }}</span>
  </label>
</template>

<script>
export default {
  name: "BaseRadioButton",
  emits: ["radioInput"],
  props: {
    radioInfo: {
      type: Object,
      default() {
        return {
          id: "myRadioId",
          name: "myRadioField",
          title: "This is a radio",
          tabindex: null,
          value: 0
        };
      },
    },
    inputValue: {
      type: Number,
      default: 0
    }
  },
  watch: {
    inputValue() {
      this.data = this.inputValue;
    }
  },
  data() {
    return {
      data: null,
    }
  },
  methods: {
    /**
     * Emit giá trị radio khi chọn bằng chuột
     * Author: HHDang (16/08/2021)
     */
    radioInput(e) {
      this.$emit("radioInput", e.target.value);
    },
    /**
     * Emit giá trị radio khi chọn bằng bàn phím (phím enter)
     * Author: HHDang (16/08/2021)
     */
    radioSeleted() {
      this.$emit("radioInput", this.radioInfo.value);
    }
  },
  created() {
    // Binding giá trị ban đầu cho radio
    this.data = this.inputValue;
  }
};
</script>

<style lang="css" scoped>
@import url("../../css/common/radiobtn.css");
</style>
