import Vue from 'vue'
import VueRouter from "vue-router";

import ThePage from "../components/layout/ThePage.vue"
import PageDeveloping from "../views/dictionary/developing/PageDeveloping.vue"
import { RouterLinkInfo } from "../resources/MISAConst"




Vue.use(VueRouter)

const routers = [
  {
    path: RouterLinkInfo.Dashboard.href,
    name: RouterLinkInfo.Dashboard.name,
    component: PageDeveloping,
    meta: { title: RouterLinkInfo.Dashboard.title },
  },
  {
    path: RouterLinkInfo.Cash.href,
    name: RouterLinkInfo.Cash.name,
    component: PageDeveloping,
    meta: { title: RouterLinkInfo.Cash.title },
  },
  {
    path: RouterLinkInfo.Bank.href,
    name: RouterLinkInfo.Bank.name,
    component: PageDeveloping,
    meta: { title: RouterLinkInfo.Bank.title },
  },
  {
    path: RouterLinkInfo.Pu.href,
    name: RouterLinkInfo.Pu.name,
    component: PageDeveloping,
    meta: { title: RouterLinkInfo.Pu.title },
  },
  {
    path: RouterLinkInfo.Sale.href,
    name: RouterLinkInfo.Sale.name,
    component: PageDeveloping,
    meta: { title: RouterLinkInfo.Sale.title },
  },
  {
    path: RouterLinkInfo.Invoice.href,
    name: RouterLinkInfo.Invoice.name,
    component: PageDeveloping,
    meta: { title: RouterLinkInfo.Invoice.title },
  },
  {
    path: RouterLinkInfo.Stock.href,
    name: RouterLinkInfo.Stock.name,
    component: PageDeveloping,
    meta: { title: RouterLinkInfo.Stock.title },
  },
  {
    path: RouterLinkInfo.Tools.href,
    name: RouterLinkInfo.Tools.name,
    component: PageDeveloping,
    meta: { title: RouterLinkInfo.Tools.title },
  },
  {
    path: RouterLinkInfo.FixedAssets.href,
    name: RouterLinkInfo.FixedAssets.name,
    component: PageDeveloping,
    meta: { title: RouterLinkInfo.FixedAssets.title },
  },
  {
    path: RouterLinkInfo.Employee.href,
    name: RouterLinkInfo.Employee.name,
    component: ThePage,
    meta: { title: RouterLinkInfo.Employee.title },
  },
  {
    path: RouterLinkInfo.Tax.href,
    name: RouterLinkInfo.Tax.name,
    component: PageDeveloping,
    meta: { title: RouterLinkInfo.Tax.title },
  },
  {
    path: RouterLinkInfo.Price.href,
    name: RouterLinkInfo.Price.name,
    component: PageDeveloping,
    meta: { title: RouterLinkInfo.Price.title },
  },
  {
    path: RouterLinkInfo.General.href,
    name: RouterLinkInfo.General.name,
    component: PageDeveloping,
    meta: { title: RouterLinkInfo.General.title },
  },
  
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

