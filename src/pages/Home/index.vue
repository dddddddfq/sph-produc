<template>
	<div>
		<TypeNav />
		<!--列表-->
		<ListContainer />
		<!--今日推荐-->
		<TodayRecommend />
		<!-- 商品排行 -->
		<Rank />
		<!-- 猜你喜欢 -->
		<Like />
		<!--楼层-->
		<Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
		<!--商标-->
		<Brand />
	</div>
</template>

<script>
	import Brand from "./Brand/Brand";
	import Floor from "./Floor/Floor";
	import Like from "./Like/Like";
	import ListContainer from "./ListContainer/ListContainer";
	import Rank from "./Rank/Rank";
	import TodayRecommend from "./TodayRecommend/TodayRecommend";
	import { mapState } from "vuex";
	export default {
		name: "Home",
		components: {
			Brand,
			Floor,
			Like,
			ListContainer,
			Rank,
			TodayRecommend,
		},
		computed: {
			...mapState({
				floorList: (state) => {
					return state.home.floorList;
				},
			}),

		},
		mounted() {
			//获取轮播图图片
			this.$store.dispatch("getFloorList");
			//获取用户信息
			this.$store.dispatch("getUserInfo");
		},

	};
</script>

<style lang="less" scoped></style>