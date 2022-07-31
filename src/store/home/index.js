import { reqGetGoods, reqMockReques, reqMockFloor } from "@/api/index";

// 引入axios 二次封装的代码
const actions = {
  //通过api里面的接口函数向服务器发请求
  async getGoods(context) {
    let result = await reqGetGoods();
    if (result.code === 200) {
      const resule = result.data.slice(0, 15);
      context.commit("GETGOODS", resule);
    }
  },
  //获取banner 列表的资源
  async getBannerList(context) {
    let result = await reqMockReques();
    if (result.code === 200) {
      context.commit("GETBANNERLIST", result.data);
    }
  },
  async getFloorList(context) {
    let result = await reqMockFloor();
    if (result.code == 200) {
      context.commit("GETFLOORLIST", result.data);
    }
  },
};
const mutations = {
  GETGOODS(state, value) {
    state.goods = value;
  },
  GETBANNERLIST(state, value) {
    state.bannerList = value;
  },
  GETFLOORLIST(state, value) {
    state.floorList = value;
  },
};
const getters = {};
const state = {
  goods: [],
  bannerList: [],
  floorList: [],
};
export default {
  actions,
  mutations,
  getters,
  state,
};
