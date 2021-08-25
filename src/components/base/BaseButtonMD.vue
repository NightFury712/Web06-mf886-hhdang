<template>
  <div
    class="context-menu"
    :class="{ hide: !mdBtn.Flag }"
    :style="{ top: mdBtn.clientY + 'px', left:  mdBtn.clientX + 'px',}"
    v-click-outside="hideMDBtn"
  >
    <button class="m-btn btn-modify" @click="modifyClick()">Sửa</button>
    <button class="m-btn btn-delete-contextmenu" @click="togglePopup()" style="border-radius: 0 4px 4px 0;">Xóa</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import {MISAFormMode} from "../../enumerables/MISAEnums"
import ClickOutside from "vue-click-outside"

export default {
  name: "BaseButtonMD",
  computed: {
    ...mapState("event", ["mdBtn", "formMode"]),
  },
  methods: {
    ...mapActions("event", ["hideMDBtn", "toggleDialog", "setFormFlagTrue"]),
    // Hiển thị popup thông báo xóa nhân viên
    togglePopup: function() {
      this.hideMDBtn();
      this.$store.dispatch("event/togglePopup", "delete");
    },
    // Hiển thị form edit nhân viên
    modifyClick: function() {
      this.formMode.status = MISAFormMode.Update;
      this.hideMDBtn();
      this.setFormFlagTrue();
      this.$store.dispatch("event/toggleDialog");
    },
  },
  directives: {
    ClickOutside
  }
};
</script>

<style lang="css" scoped>
@import url("../../css/common/button.css");
</style>
