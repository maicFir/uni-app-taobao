<template>
	<view class="add-shop">
		<uni-forms ref="form" :rules="rules" :modelValue="formParams" label-width="80">
			<uni-forms-item label="商品名称" required name="title">
				<uni-easyinput type="text" :disabled="routerQuery.type === 'view'" v-model="formParams.title" placeholder="请输入商品名称" />
			</uni-forms-item>
			<uni-forms-item label="商品描述" required name="descption">
				<uni-easyinput type="text" :disabled="routerQuery.type === 'view'" v-model="formParams.descption" placeholder="请输入商品描述" />
			</uni-forms-item>
			<uni-forms-item label="商品价格" required name="price">
				<uni-easyinput type="text" :disabled="routerQuery.type === 'view'" v-model="formParams.price" placeholder="请输入商品价格" />
			</uni-forms-item>
			<uni-forms-item label="商品图片" name="picture">
				<uni-file-picker :readonly="routerQuery.type === 'view'" v-model="imageValue" fileMediatype="image" mode="grid" limit="1" @success="success" />
			</uni-forms-item>
		</uni-forms>
		<button type="primary" @click="submit('valiForm')">
			{{buttonText[routerQuery.type]}}
		</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: [],
				rules: {
					title: {
						rules: [{
							required: true,
							errorMessage: "请输入商品名称",
						}]
					},
					descption: {
						rules: [{
							required: true,
							errorMessage: "请输入描述",
						}]
					},
					price: {
						rules: [{
							required: true,
							errorMessage: "请输入价格",
						}]
					}

				},
				formParams: {
					title: "",
					descption: "",
					picture: "",
					price: "0"
				},
				routerQuery: {
					type: 'add'
				},
				buttonText: {
					add: '提交',
					edit: '保存',
					view: '返回'
				}
			}
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.form.setRules(this.rules)
		},
		onLoad(e) {
			this.routerQuery = e;
			if (e.type !== 'add') {
				this.queryDetail();
			}
			if (e.type === 'add') {
				uni.setTopBarText('添加购物车')
			} else if (e.type === 'edit') {
				uni.setNavigationBarTitle({
					title: "编辑购物车"
				})
			} else {
				uni.setNavigationBarTitle({
					title: "查看购物车"
				})
			}
		},
		methods: {
			success(e) {
				console.log(e)
				const [pic] = e.tempFilePaths;
				this.formParams.picture = pic;
				this.imageValue = [{
					url: pic
				}]
			},
			submit() {
				uni.showLoading()
				this.$refs.form.validate().then(res => {
					if (this.routerQuery.type === 'add') {
						this.addRequestShop();
					} else {
						this.updateReuestShop();
					}
					uni.hideLoading()
					console.log('表单数据信息：', res);
				}).catch(err => {
					uni.hideLoading()
					console.log('表单错误信息：', err);
				})
			},
			addRequestShop() {
				uniCloud.callFunction({
					name: "taobao_shop_add",
					data: this.formParams
				}).then((res) => {
					console.log(res, '11')
					uni.reLaunch({
						url: '/pages/shop/shop'
					})
				})
			},
			updateReuestShop(){
				const obj = uniCloud.importObject("taobao_shop_query");
				const { formParams} = this;
				obj.update(formParams).then(() => {
					uni.reLaunch({
						url: '/pages/shop/shop'
					})
				});
			},
			queryDetail() {
				const obj = uniCloud.importObject("taobao_shop_query");
				const { routerQuery: { _id } } = this;
				obj.queryDetail({ _id }).then((res) => {
					console.log(res.data)
					this.formParams = res.data[0];
					this.imageValue = [
						{
							url: res.data[0].picture
						}
					]
				})
			}
		}
	}
</script>

<style>
	.add-shop {
		padding: 20rpx 10rpx;
	}
</style>
