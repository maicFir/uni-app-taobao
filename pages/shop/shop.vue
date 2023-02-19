<template>
	<view class="shop-list">
		<view><button @click="handleToShop">添加购物车</button></view>
	<!-- 	<button @click="handleQueryData">获取数据</button> -->
		<view v-if="result">
			<uni-list class="shop-list-container" :border="false">
				<uni-list-item v-for="(item, index) in result" :key="index" @click.native.stop="handleEdit(item, 'view')">
					<template slot="body">
						<view class="shop-list-container-pic">
							<image class="img"  style="width:100px;height:80px" :src="item.picture || DefaultImage" mode="aspectFill"></image>
						</view>
						<view class="shop-list-container-content">
							<view class="title">{{item.title}}</view>
							<view class="desc">
								<text>{{item.descption}}</text>
								<text class="price">￥{{item.price}}</text>
							</view>
							<view class="options">
								<text @click.stop="handleEdit(item)">编辑</text>
								<text @click.stop="handleDelete(item)">删除</text>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<view v-else class="no-empty">暂无数据</view>
	</view>
</template>

<script>
	import DefaultImage from "@/static/default.png";
	
	export default {
		data() {
			return {
				result: '',
				DefaultImage
			}
		},
		onPullDownRefresh() {
			this.handleQueryData();
		},
		methods: {
			handleToShop() {
				uni.navigateTo({
					url:"/pages/shop/add/add?type=add"
				})
			},
			async handleQueryData() {
				const shopqueryObj = uniCloud.importObject("taobao_shop_query");
				const res = await shopqueryObj.query();
				this.result = res.data;
				uni.stopPullDownRefresh();
				console.log('res:', res)
			},
			handleEdit({_id}, type="edit") {
				uni.navigateTo({
					url: `/pages/shop/add/add?_id=${_id}&type=${type}`
				})
			},
				
			async handleDelete({_id}) {
					const shopqueryObj = uniCloud.importObject("taobao_shop_query");
					await shopqueryObj.delete({_id});
					this.handleQueryData();
			},
			async queryTest() {
				const res = await uni.request({
					url:"https://tb.wmcweb.cn/query/query",
					
				})
				console.log('test', res)
			}
		},
		created() {
			this.handleQueryData();
			this.queryTest();
		}
	}
</script>

<style lang="scss">
.no-empty {
	text-align: center;
	padding: 20rpx 0;
}
.shop-list {
	&-container {
		&-content {
			width: 100%;
			.desc {
				.price {
					color: #FF8D0E;
				}
			}
			.options {
				text-align: right;
				color: #666;
				text {
					padding: 0 5px;
				}
			}
		}
	}
}
</style>
