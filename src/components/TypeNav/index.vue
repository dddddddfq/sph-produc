<template>
	<div class="type-nav">
		<div class="container">
			<div @mouseleave="hidenLise" @mouseenter="showList">
				<h2 class="all">全部商品分类</h2>
				<transition name="sort">
					<div class="sort" v-show="show">
						<div class="all-sort-list2" @click="goSearch">
							<div class="item" v-for="(c1, index) in goods" :key="c1.categoryId">
								<h3 @mouseenter="changeIndex(index)" :class="{ cur: curIndex === index }">
									<a :data-goodsName="c1.categoryName" :data-category1Id="c1.categoryId">{{
										c1.categoryName }}</a>
								</h3>
								<!--二级,三级分类 -->
								<div class="item-list clearfix"
									:style="{ display: curIndex === index ? 'block' : 'none' }">
									<div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
										<dl class="fore">
											<dt>
												<a :data-goodsName="c1.categoryName"
													:data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
											</dt>
											<dd>
												<em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
													<a :data-goodsName="c1.categoryName"
														:data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
												</em>
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
			<nav class="nav">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">尚品汇超市</a>
				<a href="###">全球购</a>
				<a href="###">闪购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
			</nav>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import throttle from "lodash/throttle.js";
	export default {
		name: "TypeNav",
		data() {
			return {
				curIndex: -1,
				show: true,
			};
		},
		computed: {
			...mapState({
				goods: (state) => {
					return state.home.goods;
				},
			}),
		},
		methods: {
			// changeIndex(index) {
			// 	this.curIndex = index;
			// },
			changeIndex: throttle(function (index) {
				this.curIndex = index;
			}, 50),
			clearIndex() {
				this.curIndex = -1;
			},
			goSearch(event) {
				//判断节点是否为a标签
				let { goodsname, category1id, category2id, category3id } =
					event.target.dataset;
				if (goodsname) {
					let location = { name: "search" };
					let query = { categoryName: goodsname };
					if (category1id) {
						query.category1Id = category1id;
					} else if (category2id) {
						query.category2Id = category2id;
					} else if (category3id) {
						query.category3Id = category3id;
					}
					if (this.$route.params) {
						location.params = this.$route.params;
						location.query = query;
						this.$router.push(location);
					}
				}
			},
			showList() {
				this.show = true
				if (this.$route.path !== "/home") {
					this.show = true;
				}
			},
			hidenLise() {
				this.curIndex = -1;
				if (this.$route.path != "/home") {
					this.show = false;
				}

			},
		},
		mounted() {
			if (this.$route.path != "/home") {
				this.show = false;
			}

		},
	};
</script>

<style lang="less" scoped>
	.type-nav {
		a {
			cursor: pointer;
			text-decoration: none;
		}

		border-bottom: 2px solid #e1251b;

		.container {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			position: relative;

			.all {
				width: 210px;
				height: 45px;
				background-color: #e1251b;
				line-height: 45px;
				text-align: center;
				color: #fff;
				font-size: 14px;
				font-weight: bold;
			}

			.nav {
				a {
					height: 45px;
					margin: 0 22px;
					line-height: 45px;
					font-size: 16px;
					color: #333;
				}
			}

			.sort {
				position: absolute;
				left: 0;
				top: 45px;
				width: 210px;
				height: 461px;
				position: absolute;
				background: #fafafa;
				z-index: 999;

				.all-sort-list2 {
					.item {
						h3 {
							line-height: 30px;
							font-size: 14px;
							font-weight: 400;
							overflow: hidden;
							padding: 0 20px;
							margin: 0;

							a {
								color: #333;
							}
						}

						.cur {
							background-color: deeppink;
						}

						.item-list {
							display: none;
							position: absolute;
							width: 734px;
							min-height: 460px;
							background: #f7f7f7;
							left: 210px;
							border: 1px solid #ddd;
							top: 0;
							z-: 9999 !important;

							.subitem {
								float: left;
								width: 650px;
								padding: 0 4px 0 8px;

								dl {
									border-top: 1px solid #eee;
									padding: 6px 0;
									overflow: hidden;
									zoom: 1;

									&.fore {
										border-top: 0;
									}

									dt {
										float: left;
										width: 54px;
										line-height: 22px;
										text-align: right;
										padding: 3px 6px 0 0;
										font-weight: 700;
									}

									dd {
										float: left;
										width: 415px;
										padding: 3px 0 0;
										overflow: hidden;

										em {
											float: left;
											height: 14px;
											line-height: 14px;
											padding: 0 8px;
											margin-top: 5px;
											border-left: 1px solid #ccc;
										}
									}
								}
							}
						}
					}
				}
			}

			.sort-enter {
				height: 0;
				opacity: 0;
			}

			.sort-enter-to {
				height: 461px;
				height: 1;
			}

			.sort-leave {
				height: 461px;
				height: 1;
			}

			.sort-leave-to {
				height: 0;
				opacity: 0;
			}

			.sort-enter-active,
			.sort-leave-active {
				transition: 0.5s all;
			}
		}
	}
</style>