<template>
  <div>
    <Header />
    <router-view></router-view>
    <!-- 判断是否显示隐藏footer组件 -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
  import Header from "./components/Header/index";
  import Footer from "./components/Footer/index";
  export default {
    data() {
      return {
        msg:'abc',
      }
    },
    name: "App",
    components: {
      Header,
      Footer,
    },
    mounted() {
      //考虑性能问题 把请求放在只会执行一次的app
      //向服务器发请求获取商品三级列表的数据
      this.$store.dispatch("getGoods");
    },
  };
</script>

<style></style>