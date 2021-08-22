import Vue from 'vue'
import VueRouter from "vue-router";

import ThePage from "../components/layout/ThePage.vue"
import ThePageCustomer from "../components/layout/ThePageCustomer.vue"
// import CustomerList from "../views/dictionary/customer/CustomerList.vue"




Vue.use(VueRouter)

const routers = [
  {
    path: '/employee',
    name: 'ThePageEmployee',
    component: ThePage,
    meta: { title: 'Trang nhân viên' },
  },
  {
    path: '/customer',
    name: 'ThePageCustomer',
    component: ThePageCustomer,
    meta: { title: 'Trang khách hàng' },
  }
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes: routers
});

const DEFAULT_TITLE = "Trang chủ";

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
})

export default router;

