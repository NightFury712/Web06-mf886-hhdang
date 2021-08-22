<template>
  <button class="m-btn m-btn-default" @click="handlerClick()">
    <div class="icon-add">
      <i 
        class="fa fa-spinner fa-spin"
        v-show="isShow"
      >
      </i>
    </div>
    <div class="btn-text">{{btnStyle.text}}</div>
  </button>
</template>

<style lang="css" scoped>
@import url("../../css/common/button.css");
</style>

<script>
export default {
  name: "BaseButton",
  emits: ["btnClick"],
  props: {
    btnStyle: {
      icon: String,
      text: String,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /**
     * Emit sự kiện click của button
     * HHDang (16/08/2021)
     */
    handlerClick() {
      this.$emit("btnClick");
    },
  },
};
</script>
