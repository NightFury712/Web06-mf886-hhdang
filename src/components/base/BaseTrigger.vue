<template>
  <div :class="['trigger-icon', {'actived-trigger': triggerFlag}]" @click="triggerClick()">
    <div class="trigger-icon-inner">
      <div class="trigger-icon-line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseTrigger",
  emits: ["triggerClick"],
  props: {
    triggerFlag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * Emit sự kiện click
     * Author: HHDang (16/08/2021)
     */
    triggerClick() {
      this.$emit("triggerClick");
    }
  }
}
</script>

<style>
@import url("../../css/common/trigger.css");
</style>