<template>
	<view class="index-content">
		<Header></Header>
		<Content></Content>
	</view>
</template>

<script>
	import Header from "./component/Header.vue";
	import Content from "./component/Content.vue";
	
	export default {
		components: {
			Header,
			Content
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			console.log('index load')
			console.log(window)
		},
		onShow() {
			console.log('index on show')
		},
		methods: {
			
		}
	}
</script>

<style>
	
</style>
