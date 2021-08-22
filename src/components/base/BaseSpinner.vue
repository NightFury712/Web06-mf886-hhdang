<template>
  <div class="spinner">
    <div class="dark-background" style="z-index: 999">
    </div>
    <div class="middle" style="z-index: 1000">
      <object :data="loaderUrl"></object>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "BaseSpinner",
  data() {
    return {
      loaderUrl: require("../../assets/content/img/loading.svg"),
    };
  },
};
</script>

<style lang="css" scoped>
@import url("../../css/common/main.css");
@import url("../../css/common/spinner.css");
</style>
