<template>
	<div class="swiper-container" ref="cut">
		<div class="swiper-wrapper">
			<div
				class="swiper-slide"
				v-for="(item, index) in skuImageList"
				:key="item.id"
			>
				<img
					:src="item.imgUrl"
					:class="{ active: index == curIndex }"
					@click="changeSelected(index)"
				/>
			</div>
		</div>
		<div class="swiper-button-next"></div>
		<div class="swiper-button-prev"></div>
	</div>
</template>

<script>
import Swiper from "swiper";
export default {
	name: "ImageList",
	data() {
		return {
			curIndex: 0,
		};
	},
	props: ["skuImageList"],
	watch: {
		skuImageList: {
			handler() {
				this.$nextTick(() => {
					new Swiper(this.$refs.cut, {
						loop: true, // 循环模式选项
						slidesPerView: 3, //显示几个图片
						slidesPerGroup: 1, //每一次切换图片的个数
						allowTouchMove: false, //不允许滑动
						// 如果需要前进后退按钮
						navigation: {
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						},
					});
				});
			},
		},
	},
	methods: {
		changeSelected(index) {
			this.curIndex = index;
			this.$bus.$emit("getIndex", this.curIndex);
		},
	},
};
</script>

<style lang="less" scoped>
.swiper-container {
	height: 56px;
	width: 412px;
	box-sizing: border-box;
	padding: 0 12px;

	.swiper-slide {
		width: 56px;
		height: 56px;

		img {
			width: 100%;
			height: 100%;
			border: 1px solid #ccc;
			padding: 2px;
			width: 50px;
			height: 50px;
			display: block;

			&.active {
				border: 2px solid #f60;
				padding: 1px;
			}
		}
	}

	.swiper-button-next {
		left: auto;
		right: 0;
	}

	.swiper-button-prev {
		left: 0;
		right: auto;
	}

	.swiper-button-next,
	.swiper-button-prev {
		box-sizing: border-box;
		width: 12px;
		height: 56px;
		background: rgb(235, 235, 235);
		border: 1px solid rgb(204, 204, 204);
		top: 0;
		margin-top: 0;

		&::after {
			font-size: 12px;
		}
	}
}
</style>