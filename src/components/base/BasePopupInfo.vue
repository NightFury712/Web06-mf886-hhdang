<template>
  <div>
    <div
      class="dark-background popup-background"
    >
    </div>
    <div class="middle ms-message-box" >
      <div class="ms-message-box--content">
        <div class="ms-content">
          <div class="icon-message">
            <div 
              :class="['mi mi-48', popup.icon]"
            >
            </div>
          </div>
          <div class="message-content">
            <span id="idMessage" class="message">
              {{ popup.title }}
            </span>
          </div>
        </div>
        <div class="mess-line"></div>
        <div class="mess-footer">
          <div class="Left">
            <button
              v-if="popup.btnContinue.flag"
              class="m-btn btn-cancel"
              @click="togglePopup()"
              tabindex="22"
            >
              <div>
                {{ popup.btnContinue.title }}
              </div>
            </button>
          </div>
          <div 
            :class="['Right',{'justify-content-center' : popup.center}]"
          >
            <button 
              v-if="popup.btnClose.flag"
              class="m-btn btn-cancel"
              @click="btnCloseClick()"
              tabindex="23"
            >
              <div>
                {{ popup.btnClose.title }}
              </div>
            </button>
            <button 
              v-if="popup.btnSave.flag"
              class="m-btn btn-save"
              @click="btnSaveClick()"
              ref="btnSave"
              tabindex="24"
            >
              <div>
                {{ popup.btnSave.title }}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "BasePopupInfo",
  emits: ["btnSaveClick", "btnCloseClick"],
  props: {
    popup: {
      type: Object,
      default() {
        return {
          icon: "mi-exclamation-question-48",
          title: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
          flagName: null,
          btnContinue: {
            flag: true,
            title: "Hủy"
          },
          btnClose: {
            flag: true,
            title: "Không"
          },
          btnSave: {
            flag: true,
            title: "Có"
          },
          center: false
        };
      },
    },
    btnCancelDialog: null,
  },
  computed: {
    ...mapState("event", ["popupFlag"]),
  },
  methods: {
    ...mapState("emp", ["formRef"]),
    /**
     * Đóng popup
     * Author: HHDang (19/09/2021)
     */
    togglePopup: function() {
      this.$store.dispatch("event/togglePopup", this.popup.flagName);
      if(this.popup.flagName === "dialog") {
        this.btnCancelDialog.focus();
      }
    },
    /**
     * Emit sự kiện click
     * Author: HHDang (19/08/2021)
     */
    btnCloseClick() {
      this.$emit("btnCloseClick");
    },
    /**
     * Đóng popup và emit sự kiện click
     * Author: HHDang (19/08/2021)
     */
    btnSaveClick() {
      this.$store.dispatch("event/togglePopup", this.popup.flagName);
      this.$emit("btnSaveClick");
    }
  },
  mounted() {
    this.$refs.btnSave.focus();
  }
};
</script>

<style lang="css">
@import url("../../css/common/pop-up-info.css");
@import url("../../css/common/pop-up.css");
</style>
