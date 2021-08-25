<template>
  <div class="container-not-found middle-sticky">
    <img src="../../assets/content/img/bg_report_nodata.76e50bd8.svg">
    <div class="title">Không có dữ liệu</div>
  </div>
</template>

<script>
export default {
  name: "BaseDataNF",

}
</script>

<style lang="css" scoped>
@import url("../../css/common/notfound.css");

.middle-sticky {
  position: sticky;
  top: 50%;
  left: 40%;
  margin-top: 50px;
}
</style>