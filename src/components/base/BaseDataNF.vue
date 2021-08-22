<template>
  <div class="container-not-found middle-sticky">
    <div class="icon"></div>
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