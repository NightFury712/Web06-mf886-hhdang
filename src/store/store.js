import Vuex from 'vuex';
import Vue from 'vue';
import employee from './modules/employee'
import customer from './modules/customer'
import event from './modules/event'

// Load vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    emp: employee,
    ctm: customer,
    event: event,
  }
})