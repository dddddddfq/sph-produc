import { reqCartList, reqDelete, reqChangeChecked } from "@/api/index";

const state = {
  carList: [],
};
const actions = {
  //获取购物车列表的数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code) {
      commit("GETCARTLIST", result.data);
    }
  },
  //删除购物车信息
  async deleteCart({ commit }, skuId) {
    let result = await reqDelete(skuId);
    if ((result.code = 200)) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //修改购物车选中状态
  async ChangeChecked({ commit }, { skuId, isChecked }) {
    let result = await reqChangeChecked(skuId, isChecked);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //删除所有勾选状态的商品
  deleteAllChecked({ getters, dispatch }) {
    let promise = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let p = item.isChecked == 1 ? dispatch("deleteCart", item.skuId) : "";
      promise.push(p);
    });
    Promise.all(promise);
  },
  //全选购物车or取消全选
  updateAllCheckedCarts({ dispatch, state }, isChecked) {
    let promise = [];
    state.carList[0].cartInfoList.forEach((item) => {
      let p = dispatch("ChangeChecked", { skuId: item.skuId, isChecked });
      promise.push(p);
    });
    return Promise.all(promise);
  },
};
const mutations = {
  GETCARTLIST(state, value) {
    state.carList = value;
  },
};
const getters = {
  cartList(state) {
    return state.carList[0] || {};
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
