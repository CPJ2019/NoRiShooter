const mysql=require('mysql');
var pool=mysql.createPool({
	host:'127.0.0.1',
	port:'3306',
	user:'root',
	password:'',
	database:'nori',
	connectionLimit:15
});
console.log('数据库连接池创建完成');
module.exports=pool;
