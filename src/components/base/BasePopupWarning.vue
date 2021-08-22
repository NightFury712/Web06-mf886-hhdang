<template>
  <div>
    <div
      class="dark-background popup-background"
      :class="{
        hidden: !popupFlag[popupInfo.flagName],
        show: popupFlag[popupInfo.flagName],
      }"
      @click="togglePopup()"
    >
    </div>
    <div
      class="popup popup-warning-size middle"
      :class="{
        hidden: !popupFlag[popupInfo.flagName],
        show: popupFlag[popupInfo.flagName],
      }"
    >
      <div class="popup-header">
        <div class="btn-close-popup">
          <button class="btn-close" @click="togglePopup()"></button>
        </div>
        <div class="popup-header-title">
          <span>{{ popupInfo.title }}</span>
        </div>
      </div>
      <div class="popup-warning-content">
        <div class="popup-warning-content__icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="popup-warning-content__text">
          <span>
            {{ popupInfo.content }}
          </span>
        </div>
      </div>
      <div class="popup-footer">
        <button
          class="m-btn"
          :class="popupInfo.btnCancel.className"
          @click="togglePopup()"
          ref="btnCancelPopup"
          tabindex="18"
        >
          {{ popupInfo.btnCancel.text }}
        </button>
        <button
          class="m-btn"
          :class="popupInfo.btnSave.className"
          @click="btnSaveClick()"
          tabindex="19"
        >
          <span>{{ popupInfo.btnSave.text }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    popupInfo: Object,
    btnCancelDialog: null,
  },
  computed: {
    ...mapState("event", ["popupFlag"]),
  },
  methods: {
    ...mapState("emp", ["formRef"]),
    /**
     * Đóng popup
     * Author: HHDang (16/08/2021)
     */
    togglePopup: function() {
      this.$store.dispatch("event/togglePopup", this.popupInfo.flagName);
      if(this.popupInfo.flagName === "dialog") {
        this.btnCancelDialog.focus();
      }
    },
    /**
     * Emit sự kiện click khi nhấn nút save của popup
     * Author: HHDang (16/08/2021)
     */
    btnSaveClick: function() {
      this.$emit("btnSaveClick");
    },
  },
  mounted() {
    this.$refs.btnCancelPopup.focus();
  },
};
</script>

<style lang="css" scoped>
@import url("../../css/common/pop-up.css");
@import url("../../css/common/pop-up-warning.css");
</style>
