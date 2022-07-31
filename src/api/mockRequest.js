//对 axios进行二次封装
import axios from "axios";
//引入进度条插件还有样式
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const requests = axios.create({
  //基本路径,发请求中路径中会出现/api
  baseURL: "/mock",
  //代表请求超时的时间
  timeout: 5000,
});
// 请求拦截器:在发送请求之前,请求拦截器可以检测到,可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
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
