<template>
  <div>
    <div class="navbar" :class="{ navbarSizeHide: sidebarFlag }">
      <BaseTrigger
        :triggerFlag="sidebarFlag"
        @triggerClick="triggerClick()"
        :class="[{ hidden: !sidebarFlag }]"
      />
      <div
        :class="[
          'logo-container',
          { hidden: sidebarFlag, shown: !sidebarFlag },
        ]"
      >
        <div class="mi mi-24 menu-container-option"></div>
        <div class="logo"></div>
      </div>
      <div class="navbar-content">
        <BaseRouterLink
          :flag="sidebarFlag"
          :routerInfo="RouterLinkInfo.Dashboard"
        />
        <BaseRouterLink
          :flag="sidebarFlag"
          :routerInfo="RouterLinkInfo.Cash"
        />
        <BaseRouterLink
          :flag="sidebarFlag"
          :routerInfo="RouterLinkInfo.Bank"
        />
        <BaseRouterLink
          :flag="sidebarFlag"
          :routerInfo="RouterLinkInfo.Pu"
        />
        <BaseRouterLink
          :flag="sidebarFlag"
          :routerInfo="RouterLinkInfo.Sale"
        />
        <BaseRouterLink
          :flag="sidebarFlag"
          :routerInfo="RouterLinkInfo.Invoice"
        />
        <BaseRouterLink
          :flag="sidebarFlag"
          :routerInfo="RouterLinkInfo.Stock"
        />
        <BaseRouterLink
          :flag="sidebarFlag"
          :routerInfo="RouterLinkInfo.Tools"
        />
        <BaseRouterLink
          :flag="sidebarFlag"
          :routerInfo="RouterLinkInfo.FixedAssets"
        />
        <BaseRouterLink
          :flag="sidebarFlag"
          :routerInfo="RouterLinkInfo.Employee"
        />
        <BaseRouterLink
          :flag="sidebarFlag"
          :routerInfo="RouterLinkInfo.Tax"
        />
        <BaseRouterLink
          :flag="sidebarFlag"
          :routerInfo="RouterLinkInfo.Price"
        />
        <BaseRouterLink
          :flag="sidebarFlag"
          :routerInfo="RouterLinkInfo.General"
        />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../../css/common/navbar.css");
@import url("../../css/common/icon.css");
.navbarSizeHide {
  width: 52px !important;
}

.shown {
  display: block;
}
</style>

<script>
import BaseRouterLink from "../base/BaseRouterLink.vue";
import BaseTrigger from "../base/BaseTrigger.vue";
import { RouterLinkInfo } from "../../resources/MISAConst";

export default {
  components: { BaseRouterLink, BaseTrigger },
  name: "TheMenu",
  computed: {
    sidebarFlag: function() {
      return this.$store.state.event.sidebarFlag;
    },
    RouterLinkInfo() {
      return RouterLinkInfo;
    }
  },
  methods: {
    /**
     * Ẩn hiện sidebar
     * Author: HHDang (16/08/2021)
     */
    triggerClick() {
      this.$store.dispatch("event/toggleSidebar");
    },
  },
};
</script>
