//当前这个模块
import request from "./request";
import mockRequest from "./mockRequest";
//对外暴露一个函数,只要外部调用这个函数 就会向服务器发送ajax请求
export const reqGetGoods = () => request.get("/product/getBaseCategoryList");
//对外暴露mock函数,只要外部调用这个函数 就会向服务器发送ajax请求
//获取banner轮播图模块的数据(
export const reqMockReques = () => mockRequest.get("/banner");
//获取floor模块的数据
export const reqMockFloor = () => mockRequest.get("/floor");
//获取search模块的数据  使用 post请求
export const reqGetSearchList = (params) =>
  request({ url: "/list", method: "post", data: params });
//获取详情页面模块的数据 用 get请求
export const reqGetDetail = (skuid) => {
  return request.get("/item/" + skuid);
};
// 添加到购物车 /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddShopCar = (skuId, skuNum) =>
  request.post(`/cart/addToCart/${skuId}/${skuNum}`);
//获取购物车列表信息   /api/cart/cartList   get请求
export const reqCartList = () => request.get("/cart/cartList");
//删除购物车信息 /api/cart/deleteCart/{skuId} 方式 Delete
export const reqDelete = (skuId) => request.delete(`/cart/deleteCart/${skuId}`);
//切换商品选中状态
export const reqChangeChecked = (skuId, isChecked) =>
  request.get(`/cart/checkCart/${skuId}/${isChecked}`);
//获取验证码  url /api/user/passport/sendCode/phone mothod get
export const reqGetCode = (phone) =>
  request.get(`/user/passport/sendCode/${phone}`);
//注册用户 url:/api/user/passport/register method:post
export const reqToRegister = (data) =>
  request.post(`/user/passport/register`, data);
//用户登录 url:/api/user/passport/login method:post
export const reqUserLogin = (data) =>
  request.post("/user/passport/login", data);
//获取用户信息 url:/api/user/passport/auth/getUserInfo method:get
export const reqGetUserInfo = () =>
  request.get("/user/passport/auth/getUserInfo");
//退出登录 /api/user/passport/logout get
export const reqLogout = () => request.get("/user/passport/logout");
//获取用户地址信息 /api/user/userAddress/auth/findUserAddressList get请求
export const reqGetAddress = () =>
  request.get("/user/userAddress/auth/findUserAddressList");
//获取交易页商品信息  /api/order/auth/trade   get请求
export const reqTradePage = () => request.get("/order/auth/trade");
//提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}   post
export const reqSubmitOrder = (tradeNo, data) =>
  request.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data);
//获取订单支付信息  /api/payment/weixin/createNative/{orderId} get
export const reqPayment = (orderId) =>
  request.get(`/payment/weixin/createNative/${orderId}`);
//获取订单支付状态  /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus = (orderId) =>
  request.get(`/payment/weixin/queryPayStatus/${orderId}`);
// 获取我的订单信息 /api/order/auth/{page}/{limit} get 请求  page页数 limit 每页显示数量
export const reqGetMyorder=(page,limit)=>request.get(`/order/auth/${page}/${limit}`)