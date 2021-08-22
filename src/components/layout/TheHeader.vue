<template>
  <div>
    <div :class="['header', {'header-resize': sidebarFlag}]">
      <div class="logo-site">
        <div 
          class="logo-box"
          v-if="!sidebarFlag"
        >
          <BaseTrigger
            :triggerFlag="sidebarFlag"
            @triggerClick="toggleSidebar()"
            :class="['trigger-header', {'hidden': sidebarFlag}]"
          />
        </div>
      </div>  
      
      <BaseDropdown 
        :drdInfo="drdInfo" 
        :content="content" 
        :inputValue="content[0].company"
      />
      <div class="account-info">
        <div class="mi mi-24 mi-bell__nav"></div>
        <div class="account-avatar"></div>
        <div class="account-name">Hoàng Hải Đăng</div>
        <div class="account-option">
          <div class="mi mi-14 mi-chevron-down"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../../css/common/header.css");
@import url("../../css/common/icon.css");
.trigger-header {
  padding: 0 !important;
}

.header-resize {
  width: calc(100% - 52px) !important;
  left: 52px !important;
}

</style>
<script>
// import BaseCombobox from "../base/BaseCombobox.vue";
import BaseDropdown from '../base/BaseDropdown.vue';
import BaseTrigger from '../../components/base/BaseTrigger.vue'
import { mapState } from 'vuex';
import { Dropdown } from '../../resources/MISAConst'

export default {
  name: "TheHeader",
  components: {
    // BaseCombobox,
    BaseDropdown,
    BaseTrigger
  },
  data() {
    return {
      drdInfo: {
        ref: 'company',
        name: "company",
        flagName: "company",
      },
      content: [
        { company: Dropdown.Company[0] },
        { company: Dropdown.Company[1] },
        { company: Dropdown.Company[2] },
      ],
      
    };
  },
  computed: {
    ...mapState("event", ["sidebarFlag"])
  },
  methods: {
    /**
     * Ẩn hiện sidebar
     * Author: HHDang (16/08/2021)
     */
    toggleSidebar: function() {
      this.$store.dispatch("event/toggleSidebar");
    },
  },
};
</script>
