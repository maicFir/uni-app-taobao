'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	// 连接以一个taobao_shop表，如果没有taobao_shop表就会自动创建
	const collect = db.collection("taobao_shop");
	//event为客户端上传的参数
	console.log('event : ', event);
	console.log('context', context)
	const res = await collect.add(event);
	//返回数据给客户端
	return res
};
