<template>
	<div class="cart">
		<h4>全部商品</h4>
		<div class="cart-main">
			<div class="cart-th">
				<div class="cart-th1">全部</div>
				<div class="cart-th2">商品</div>
				<div class="cart-th3">单价（元）</div>
				<div class="cart-th4">数量</div>
				<div class="cart-th5">小计（元）</div>
				<div class="cart-th6">操作</div>
			</div>
			<div class="cart-body">
				<ul class="cart-list" v-for="(cart, index) in cartInfoList" :key="cart.id">
					<li class="cart-list-con1">
						<input type="checkbox" name="chk_list" :checked="cart.isChecked == 1"
							@change="updateChecked(cart, $event)" />
					</li>
					<li class="cart-list-con2">
						<img :src="cart.imgUrl" />
						<div class="item-msg">
							{{ cart.skuName }}
						</div>
					</li>

					<li class="cart-list-con4">
						<span class="price">{{ cart.cartPrice }}.00</span>
					</li>
					<li class="cart-list-con5">
						<a href="javascript:void(0)" class="mins" @click="sendNum('minus', -1, cart)">-</a>
						<input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum"
							@change="sendNum('change', $event.target.value * 1, cart)" />
						<a href="javascript:void(0)" class="plus" @click="sendNum('add', 1, cart)">+</a>
					</li>
					<li class="cart-list-con6">
						<span class="sum">{{ cart.skuNum * cart.cartPrice }}</span>
					</li>
					<li class="cart-list-con7">
						<a class="sindelet" @click="deleteShopCarts(cart)">删除</a>
						<br />
						<a href="#none">移到收藏</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="cart-tool">
			<div class="select-all">
				<input class="chooseAll" type="checkbox" :checked="isCheckAll" @change="updateAllCheckedCart" />
				<span>全选</span>
			</div>
			<div class="option">
				<a @click="deleteAllCheckedCart">删除选中的商品</a>
				<a href="#none">移到我的关注</a>
				<a href="#none">清除下柜商品</a>
			</div>
			<div class="money-box">
				<div class="chosed">
					已选择 <span>{{ totalNum }}</span>件商品
				</div>
				<div class="sumprice">
					<em>总价（不含运费） ：</em>
					<i class="summoney">{{ totalPrice }}</i>
				</div>
				<div class="sumbtn">
					<router-link to="/trade" class="sum-btn">结算</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import throttle from "lodash/throttle";
	export default {
		name: "ShopCart",
		methods: {
			getData() {
				//获取个人购物车的数据
				this.$store.dispatch("getCartList");
			},
			sendNum: throttle(async function (type, disNum, cart) {
				//type	是为了区分三个元素
				//disNum形参 是为了知道变化量
				//cart 是为了知道产品的id
				switch (type) {
					//如果是add的情况下
					case "add":
						// disNum是带给服务器的数据
						disNum = 1;
						break;
					case "minus":
						// 如果disNum大于1 那么就给disNum赋值-1 如果 不大于1 那么赋值0保持原来数据的不变
						disNum = cart.skuNum > 1 ? -1 : 0;
						break;
					case "change":
						if (isNaN(disNum) || disNum < 1) {
							disNum = 0;
						} else {
							disNum = parseInt(disNum) - cart.skuNum;
						}
						break;
				}
				try {
					await this.$store.dispatch("addAndUpdataShopCarts", {
						skuId: cart.skuId,
						skuNum: disNum,
					});
					this.getData();
				} catch (error) {
					alert(error.message);
				}
			}, 1000),
			//删除事件
			deleteShopCarts(cart) {
				try {
					//如果删除成功再次发送请求获取新的数据 进行页面展示
					this.$store.dispatch("deleteCart", cart.skuId);
					this.getData();
				} catch (error) {
					alert(error.message);
				}
			},
			//修改某一个产品的复选框勾选状态
			async updateChecked(cart, event) {
				try {
					let isChecked = event.target.checked ? "1" : "0";
					await this.$store.dispatch("ChangeChecked", {
						skuId: cart.skuId,
						isChecked,
					});
					this.getData();
				} catch (error) {
					alert(error.message);
				}
			},
			//清空购物车
			async deleteAllCheckedCart() {
				try {
					await this.$store.dispatch("deleteAllChecked");
					this.getData();
				} catch (error) {
					alert(error.message);
				}
			},
			//全选or 全不选
			updateAllCheckedCart: throttle(async function (event) {
				try {
					let isChecked = event.target.checked ? "1" : "0";
					//派发action
					await this.$store.dispatch("updateAllCheckedCarts", isChecked);
					this.getData();
				} catch (error) {
					alert(error.message);
				}
			}, 200),
		},
		computed: {
			...mapGetters(["cartList"]),
			cartInfoList() {
				return this.cartList.cartInfoList || [];
			},
			//总的价格
			totalPrice() {
				let sum = 0;
				this.cartInfoList.forEach((item) => {
					sum += item.skuNum * item.cartPrice;
				});
				return sum;
			},
			//总件数
			totalNum() {
				let sum = 0;
				this.cartInfoList.forEach((item) => {
					sum += item.skuNum;
				});
				return sum;
			},
			//全选按钮的勾选与不勾选
			isCheckAll() {
				return this.cartInfoList.every((item) => item.isChecked == 1);
			},
		},
		mounted() {
			this.getData();
		},
	};
</script>

<style lang="less" scoped>
	.cart {
		width: 1200px;
		margin: 0 auto;

		h4 {
			margin: 9px 0;
			font-size: 14px;
			line-height: 21px;
		}

		.cart-main {
			.cart-th {
				background: #f5f5f5;
				border: 1px solid #ddd;
				padding: 10px;
				overflow: hidden;

				&>div {
					float: left;
				}

				.cart-th1 {
					width: 25%;

					input {
						vertical-align: middle;
					}

					span {
						vertical-align: middle;
					}
				}

				.cart-th2 {
					width: 25%;
				}

				.cart-th3,
				.cart-th4,
				.cart-th5,
				.cart-th6 {
					width: 12.5%;
				}
			}

			.cart-body {
				margin: 15px 0;
				border: 1px solid #ddd;

				.cart-list {
					padding: 10px;
					border-bottom: 1px solid #ddd;
					overflow: hidden;

					&>li {
						float: left;
					}

					.cart-list-con1 {
						width: 15%;
					}

					.cart-list-con2 {
						width: 35%;

						img {
							width: 82px;
							height: 82px;
							float: left;
						}

						.item-msg {
							float: left;
							width: 150px;
							margin: 0 10px;
							line-height: 18px;
						}
					}

					.cart-list-con4 {
						width: 10%;
					}

					.cart-list-con5 {
						width: 17%;

						.mins {
							border: 1px solid #ddd;
							border-right: 0;
							float: left;
							color: #666;
							width: 6px;
							text-align: center;
							padding: 8px;
						}

						input {
							border: 1px solid #ddd;
							width: 40px;
							height: 33px;
							float: left;
							text-align: center;
							font-size: 14px;
						}

						.plus {
							border: 1px solid #ddd;
							border-left: 0;
							float: left;
							color: #666;
							width: 6px;
							text-align: center;
							padding: 8px;
						}
					}

					.cart-list-con6 {
						width: 10%;

						.sum {
							font-size: 16px;
						}
					}

					.cart-list-con7 {
						width: 13%;

						a {
							color: #666;
						}
					}
				}
			}
		}

		.cart-tool {
			overflow: hidden;
			border: 1px solid #ddd;

			.select-all {
				padding: 10px;
				overflow: hidden;
				float: left;

				span {
					vertical-align: middle;
				}

				input {
					vertical-align: middle;
				}
			}

			.option {
				padding: 10px;
				overflow: hidden;
				float: left;

				a {
					float: left;
					padding: 0 10px;
					color: #666;
				}
			}

			.money-box {
				float: right;

				.chosed {
					line-height: 26px;
					float: left;
					padding: 0 10px;
				}

				.sumprice {
					width: 200px;
					line-height: 22px;
					float: left;
					padding: 0 10px;

					.summoney {
						color: #c81623;
						font-size: 16px;
					}
				}

				.sumbtn {
					float: right;

					a {
						display: block;
						position: relative;
						width: 96px;
						height: 52px;
						line-height: 52px;
						color: #fff;
						text-align: center;
						font-size: 18px;
						font-family: "Microsoft YaHei";
						background: #e1251b;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>