import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import home from "@/store/home/index";
import search from "@/store/search/index";
import detail from "@/store/detail/index";
import shopcarts from "./shopcarts/index";
import user from "./user/index";
import trade from "./trade/index";
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcarts,
    user,
    trade,
  },
});
