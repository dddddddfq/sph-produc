import { reqGetAddress, reqTradePage } from "@/api";
const actions = {
  //获取用户地址信息
  async getAddress({ commit }) {
    let result = await reqGetAddress();
    if (result.code == 200) {
      commit("GETADDRESS", result.data);
      return "ok";
    }
  },
  //获取交易页商品信息
  async tradePage({ commit }) {
    let result = await reqTradePage();
    if ((result.code = 200)) {
      commit("TRADEPAGE", result.data);
      return "ok";
    }
  },
};
const mutations = {
  GETADDRESS(state, value) {
    state.address = value;
  },
  TRADEPAGE(state, value) {
    state.userTardePage = value;
  },
};
const state = {
  address: [],
  userTardePage: {},
  code:''
};
const getters = {};
export default {
  actions,
  mutations,
  state,
  getters,
};
