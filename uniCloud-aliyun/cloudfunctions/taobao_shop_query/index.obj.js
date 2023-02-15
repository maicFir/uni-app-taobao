// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const db = uniCloud.database();
module.exports = {
	_before: function () { // 通用预处理器

	},
	async query() {
		const collect = db.collection("taobao_shop");
		const res =  await collect.get();
		return res;
	},
	// 查询详情
	async queryDetail(params) {
		const collect = db.collection("taobao_shop");
		const res =  await collect.doc(params._id).get();
		return res;
	},
	// 更新保存
	async update(params) {
		const collect = db.collection("taobao_shop");
		const {_id, ...rest } = params;
		const res = await collect.doc(params._id).update(rest);
		return res;
	},
	// 删除
	async delete(params) {
		const collect = db.collection("taobao_shop");
		const { _id } = params;
		const res = await collect.doc(_id).remove()
		return res;
	}
}
