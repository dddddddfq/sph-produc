import vue from "vue";
import VueRouter from "vue-router";
vue.use(VueRouter);

// 保留原来的push,replace方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

const  Home =()=>import("@/pages/Home/index");
const ShopCart=()=>import("@/pages/ShopCart/index")
const  Login =()=>import("@/pages/Login/index");
const  Register =()=>import("@/pages/Register/index");
const  Search =()=>import("@/pages/Search/index");
const  Detail =()=>import("@/pages/Detail/index");
const  AddCartSuccess =()=>import("@/pages/AddCartSuccess/index");
const  Trade =()=>import("@/pages/Trade/index");
const  Pay =()=>import("@/pages/Pay/index");
const  PaySuccess =()=>import("@/pages/PaySuccess/index");
const  Center =()=>import("@/pages/Center/index");
const  Myorder =()=>import("@/pages/Center/Myorder/index");
const  Grouporder =()=>import("@/pages/Center/Grouporder/index");
import store from "@/store/index";

const router = new VueRouter({
  routes: [
    {
      path: "/center",
      component: Center,
      children: [
        {
          path: "myorder",
          component: Myorder,
        },
        {
          path: "grouporder",
          component: Grouporder,
        },
        {
          path: "/",
          redirect: "/center/myorder",
        },
      ],
    },
    {
      path: "/paysuccess",
      component: PaySuccess,
    },
    {
      path: "/pay",
      component: Pay,
      beforeEnter: (to, from, next) => {
        if (from.path != "/trade") {
          next(false);
        } else {
         next()
        }
      },
    },
    {
      path: "/trade",
      component: Trade,
      beforeEnter: (to, from, next) => {
        if (from.path != "/shopcart") {
          next(false);
        } else {
          next();
        }
      },
    },
    {
      path: "/shopcart",
      component: ShopCart,
    },
    {
      path: "/addcartsuccess",
      component: AddCartSuccess,
      name: "addcartsuccess",
      meta: {
        show: true,
      },
    },
    {
      path: "/detail/:skuid?",
      component: Detail,
      meta: {
        show: true,
      },
    },
    {
      path: "/detail/:skuid?",
      component: Detail,
      meta: {
        show: true,
      },
    },
    {
      path: "/home",
      component: Home,
      meta: {
        show: true,
      },
    },
    {
      path: "/login",
      component: Login,
      meta: {
        show: false,
      },
    },
    {
      path: "/register",
      component: Register,
      meta: {
        show: false,
      },
    },
    {
      path: "/search/:keyword?",
      name: "search",
      component: Search,
      meta: { show: true },
      //布尔值写法 只能获取params
      props: true,
      //对象写法只能获取额外props参数
      // props: {
      //     a: 1
      // }
      //函数写法 可以获取params和query参数
      // props: (router) => {
      //   return { keyword: router.query.keyWord };
      // },
    },
    {
      path: "*",
      redirect: "/home",
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 };
  },
});
router.beforeEach(async (to, from, next) => {
  //to 获取要跳转到的路由信息
  //from 获取从哪个路由跳转过来的信息
  //next next() 放行
  let token = store.state.user.token;
  if (token) {
    if (to.path == "/login") {
      next("/home");
    } else {
      //获取用户信息
      try {
        await store.dispatch("getUserInfo");
        next();
      } catch (error) {
        //如果获取不到用户信息 清除token 返回登录页面
        await store.dispatch("logout");
        next("/login");
      }
    }
  } else {
    let toPath = to.path;
    if (
      toPath.indexOf("trade") != -1 ||
      toPath.indexOf("center") != -1 ||
      toPath.indexOf("pay") != -1
    ) {
      //把未登录时想要去的地址而没有去成的地址 使用 query参数存储在地址栏[路由中]中
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});
export default router;
