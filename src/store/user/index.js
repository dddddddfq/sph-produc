import {
  reqGetCode,
  reqToRegister,
  reqUserLogin,
  reqGetUserInfo,
  reqLogout,
} from "@/api";
import { setToken, getToken } from "@/utils/token";
const actions = {
  //获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  //提交注册信息
  async ToRegister({ commit }, data) {
    let result = await reqToRegister(data);
    // 判断是否成功
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  //用户登录
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    

    if (result.code == 200) {
      commit("USERLOGIN", result.data.token);
      setToken(result.data.token);
    }else{
      throw new Error(result.message);
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqGetUserInfo();
    if (result.code) {
      commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  //退出登录
  async logout({ commit }) {
    let result = await reqLogout();
    if (result.code == 200) {
      commit("CLEAR");
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
};
const mutations = {
  CLEAR(state) {
    state.userInfo = {};
  },
  GETCODE(state, value) {
    state.code = value;
  },
  USERLOGIN(state, value) {
    state.token = value;
  },
  GETUSERINFO(state, value) {
    state.userInfo = value;
  },
};
const getters = {};
const state = {
  code: "",
  token: getToken(),
  userInfo: {},
};
export default {
  actions,
  mutations,
  getters,
  state,
};
