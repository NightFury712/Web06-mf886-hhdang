<template>
  <div id="app">
    <div id="toast"></div>
    <transition name="fade">
      <BaseSpinner v-if="spinner" />
    </transition>
    <TheHeader />
    <TheMenu />
    <BaseButtonMD />
    <router-view />
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheMenu from './components/layout/TheMenu.vue'
import { mapGetters, mapActions, mapState } from 'vuex'
import BaseButtonMD from './components/base/BaseButtonMD.vue';
import {Pagination} from './js/pagination'
import BaseSpinner from './components/base/BaseSpinner.vue';

export default {
  name: "App",
  mixins: [Pagination],
  data() {
    return {
      sidebarFlag: false,
    }
  },
  components: {
    TheHeader,
    TheMenu,
    BaseButtonMD,
    BaseSpinner
  },
  computed: {
    ...mapGetters("emp", ["allEmployees"]),
    ...mapState("event", ["dialogFlag", "spinner"])
  },
  methods: {
    ...mapActions("emp", ["loadData"]),
    ...mapActions("ctm", ["getCustomers"])
  },
  async created() {
    this.$store.state.emp.formRef = {};
  }
};
</script>

<style>
@import url("./css/common/common.css");
</style>
