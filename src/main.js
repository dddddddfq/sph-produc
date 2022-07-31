import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
// 引入vuex
import store from "@/store/index";
//引入全局组件
import TypeNav from "@/components/TypeNav/index";
import Carouse from "@/components/Carouse/index";
import Pagination from "@/components/Pagination/index";
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carouse.name, Carouse);
Vue.component(Pagination.name, Pagination);
Vue.config.productionTip = false;
//引入swiper组件的css样式
import "swiper/css/swiper.css";
//引入mock
import "@/mock/mockServe";
//引入 请求列表
import * as API from "@/api/index";
//按需引入element-ui组件
import { Button, MessageBox } from "element-ui";
Vue.component(Button.name, Button);
//引入插件
import VueLazyload from 'vue-lazyload';
import '@/plugin/validate'
//引入懒加载图片
import lazyImg from '@/assets/1.gif'
Vue.use(VueLazyload, {
  loading: lazyImg
})
new Vue({
  render: (h) => h(App),
  router,
  store,
  //创建全局时间总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    //创建全局 api
    Vue.prototype.$API = API;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
}).$mount("#app");
