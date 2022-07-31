import { reqGetSearchList } from "@/api";
const actions = {
  async getSearchList(context, params = {}) {
    let result = await reqGetSearchList(params);
    if (result.code == 200) {
      context.commit("GETSEARCHLIST", result.data);
    }
  },
};
const mutations = {
  GETSEARCHLIST(state, value) {
    state.searchList = value;
  },
};
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList;
  },
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
};
const state = {
  searchList: {},
};
export default {
  actions,
  mutations,
  getters,
  state,
};
