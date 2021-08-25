<template>
  <button 
    class="m-btn m-btn-default" 
    @click="handlerClick()"
    @keydown.tab="tabEnd()"
  >
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
  emits: ["btnClick", "tabEnd"],
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
    /**
     * Xử lý sự kiện tránh tab ra ngoài form
     * Author: HHDang (20/08/2021)
     */
    tabEnd() {
      this.$emit("tabEnd");
    }
  },
};
</script>
