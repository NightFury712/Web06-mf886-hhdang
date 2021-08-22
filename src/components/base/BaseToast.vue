<template>
  <div>
    <div class="toast toast--success">
      <div class="toast__icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <div class="toast__body">
        <span class="toast__msg">Thêm mới thành công!</span>
      </div>
      <div class="toast__close">
        <i class="fas fa-times"></i>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url('../../css/common/toast');
</style>

<script>
export default {
  name: "BaseToast"
}
</script>
