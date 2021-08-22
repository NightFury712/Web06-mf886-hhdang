<template>
  <label :for="checkboxInfo.id" class="checkbox-label">
    <input type="checkbox" :name="checkboxInfo.name" :id="checkboxInfo.id" class="checkbox-input">
    <div class="checkbox-border"></div>
    <i class="fas fa-check"></i>
    <span class="checkbox-title">{{checkboxInfo.title}}</span>
  </label>
</template>

<script>
export default {
  name: "BaseCheckbox",
  props: {
    checkboxInfo: {
      type: Object,
      default() {
        return {
          is: "myCheckboxId",
          name: "checkboxField",
          title: "This is a checkbox"
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
@import url("../../../css/common/checkboxcustom.css");

</style>