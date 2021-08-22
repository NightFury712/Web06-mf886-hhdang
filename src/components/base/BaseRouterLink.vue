<template>
  <div>
    <router-link 
      class="nav-item" active-class="router-actived" 
      :to="routerInfo.href"
    >
      <div :class="['nav-item-icon mi mi-24', routerInfo.icon ]">
      </div>
      <div :class="['nav-item-text', {'hidden': flag, 'shown': !flag}]"> {{ routerInfo.title }}</div>
    </router-link>
  </div>
  
</template>

<script>
export default {
  name: "BaseRouterLink",
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    routerInfo: Object
  },
}
</script>

<style lang="css" scoped>


</style>