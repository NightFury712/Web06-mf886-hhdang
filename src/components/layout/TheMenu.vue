<template>
  <div>
    
    <div class="navbar" :class="{navbarSizeHide: sidebarFlag}">
      <BaseTrigger
        :triggerFlag="sidebarFlag"
        @triggerClick="triggerClick()"
        :class="[{'hidden': !sidebarFlag}]"
      />
      <div :class="['logo-container', {'hidden': sidebarFlag, 'shown': !sidebarFlag}]">
        <div class="mi mi-24 menu-container-option">
        </div>
        <div class="logo">
        </div>
      </div>
      <div class="navbar-content">
        <BaseRouterLink 
          :flag="sidebarFlag"
          :routerInfo="{
            href: '/dashboard',
            icon: 'mi-sidebar-dashboard',
            title: 'Tổng quan'
          }"
        />
        <BaseRouterLink 
          :flag="sidebarFlag"
          :routerInfo="{
            href: '/cash',
            icon: 'mi-sidebar-cash',
            title: 'Tiền mặt'
          }"
        />
        <BaseRouterLink 
          :flag="sidebarFlag"
          :routerInfo="{
            href: '/bank',
            icon: 'mi-sidebar-bank',
            title: 'Tiền gửi'
          }"
        />
        <BaseRouterLink 
          :flag="sidebarFlag"
          :routerInfo="{
            href: '/pu',
            icon: 'mi-sidebar-pu',
            title: 'Mua hàng'
          }"
        />
        <BaseRouterLink 
          :flag="sidebarFlag"
          :routerInfo="{
            href: '/sale',
            icon: 'mi-sidebar-sale',
            title: 'Bán hàng'
          }"
        />
        <BaseRouterLink 
          :flag="sidebarFlag"
          :routerInfo="{
            href: '/invoice',
            icon: 'mi-sidebar-invoice',
            title: 'Quản lý hóa đơn'
          }"
        />
        <BaseRouterLink 
          :flag="sidebarFlag"
          :routerInfo="{
            href: '/stock',
            icon: 'mi-sidebar-stock',
            title: 'Kho'
          }"
        />
        <BaseRouterLink 
          :flag="sidebarFlag"
          :routerInfo="{
            href: '/tools',
            icon: 'mi-sidebar-tools',
            title: 'Công cụ dụng cụ'
          }"
        />
        <BaseRouterLink 
          :flag="sidebarFlag"
          :routerInfo="{
            href: '/fixed-assets',
            icon: 'mi-sidebar-fixed-assets',
            title: 'Tài sản cố định'
          }"
        />
        <BaseRouterLink 
          :flag="sidebarFlag"
          :routerInfo="{
            href: '/employee',
            icon: 'mi-sidebar-employee',
            title: 'Nhân viên',
          }"
        />
        <BaseRouterLink 
          :flag="sidebarFlag"
          :routerInfo="{
            href: '/tax',
            icon: 'mi-sidebar-tax',
            title: 'Thuế',
          }"
        />
        <BaseRouterLink 
          :flag="sidebarFlag"
          :routerInfo="{
            href: '/price',
            icon: 'mi-sidebar-price',
            title: 'Giá thành',
          }"
        />
        <BaseRouterLink 
          :flag="sidebarFlag"
          :routerInfo="{
            href: '/general',
            icon: 'mi-sidebar-general',
            title: 'Ngân sách',
          }"
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
import BaseRouterLink from '../base/BaseRouterLink.vue';
import BaseTrigger from '../base/BaseTrigger.vue';
export default {
  components: { BaseRouterLink, BaseTrigger },
  name: "TheMenu",
  computed: {
    sidebarFlag: function() {
      return this.$store.state.event.sidebarFlag;
    }
  },
  methods: {
    /**
     * Ẩn hiện sidebar
     * Author: HHDang (16/08/2021)
     */
    triggerClick() {
      this.$store.dispatch("event/toggleSidebar");
    }
  }
};
</script>
