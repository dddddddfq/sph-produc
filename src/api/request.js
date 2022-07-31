//对 axios进行二次封装
import axios from "axios";
//引入进度条插件还有样式
import nprogress from "nprogress";
import "nprogress/nprogress.css";
// 引入uuid 并且添加到请求头当中
import store from "@/store/index";

const requests = axios.create({
  //基本路径,发请求中路径中会出现/api
  baseURL: "/api",
  //代表请求超时的时间
  timeout: 5000,
});
// 请求拦截器:在发送请求之前,请求拦截器可以检测到,可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  if (store.state.detail.uuid_token) {
    //   给请求头添加一个字段 和后台老师商量好加的
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  //进度条开始动
  nprogress.start();
  return config;
});

requests.interceptors.response.use(
  (res) => {
    //进度条结束
    nprogress.done();
    return res.data;
  },
  (error) => {
    return Promise.reject(new Error("faile"));
  }
);

export default requests;
