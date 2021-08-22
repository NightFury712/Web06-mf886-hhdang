import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router/index'
import VTooltip from 'v-tooltip'

Vue.config.productionTip = false

Vue.use(VTooltip);

// Kiểm tra xem hàm đã được thực thi chưa
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

new Vue({
  store,
  router: router,
  render: h => h(App),
}).$mount('#app')
