import { reqGetDetail, reqAddShopCar } from "@/api";
// 引入获取uuid的函数 获取的uuid必须为同一个数值
import { getUuid } from "@/utils/uuid_token.js";
const state = {
  details: {},
  uuid_token: getUuid(),
};
const actions = {
  // 获取商品的详情页面
  async getDetails(context, skuid) {
    let result = await reqGetDetail(skuid);
    if (result.code === 200) {
      context.commit("GETDETAILS", result.data);
    }
  },
  // 添加或者更新购物车信息
  async addAndUpdataShopCarts(context, { skuId, skuNum }) {
    let result = await reqAddShopCar(skuId, skuNum);
    if (result.code === 200) {
      return "ok";
    } else {
      return new Error("faile");
    }
  },
};
const mutations = {
  GETDETAILS(state, value) {
    state.details = value;
  },
};
const getters = {
  categoryView(state) {
    return state.details.categoryView || {};
  },
  skuInfo(state) {
    return state.details.skuInfo || {};
  },
  //获取商品属性数据
  spuSaleList(state) {
    return state.details.spuSaleAttrList || [];
  },
};
export default {
  actions,
  mutations,
  getters,
  state,
};
