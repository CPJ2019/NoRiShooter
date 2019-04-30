const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//用户注册
router.post('/reg',(req,res)=>{
	var obj=req.body;
//	var num=400;
//	for(var key in obj){
//		num++;
//		if(!obj[key]){
//		    res.send(' 不能为空')
//			return;
//		}
//	}
	var sql='INSERT INTO nori_user SET ?';
	pool.query(sql,[obj],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			console.log("新用户注册")
			console.log(obj)
			res.send('1');
			return;
//		}else{
//			res.send('0');
//			return;
		}
	})
})
//注册用户名重复验证
router.get('/unamecheck',(req,res)=>{
	var u=req.query.uname;
	console.log(1)
	var sql='SELECT*FROM nori_user WHERE uname=?';
	pool.query(sql,[u],(err,result)=>{
		if(err) throw err;
		if(result.length==0){
			res.send('1');
			return;
		}else{
			res.send('0');
			return;
		}
	})
})
//用户登录
router.post('/login',(req,res)=>{
	var u=req.body.uname;
	var p=req.body.upwd;
	//console.log(p)
//	if(!u){
//		res.send('用户名不能为空');
//		return;
//	}
//	if(!p){
//		res.send('密码不能为空');
//		return;
//	}	
	var sql1='SELECT*FROM nori_user WHERE uname=?';
	var sql2='SELECT*FROM nori_user WHERE uname=? AND upwd=?';
	pool.query(sql1,[u],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			pool.query(sql2,[u,p],(err,result)=>{
				if(err) throw err;
				if(result.length>0){
					res.send('1');
					console.log('用户'+u+'登录成功')
					return;
				}else{
					res.send('0');
				}
			})
		}else{
			res.send('2');
			return;
		}
	})
})
//用户列表
router.get('/list',(req,res)=>{
	console.log('请求后台用户列表')
	var start=parseInt(req.query.start);
	var count=parseInt(req.query.count);
	if(!start) start=0;
	if(!count) count=10;
	var sql='SELECT*FROM nori_user LIMIT ?,?';
	pool.query(sql,[start,count],(err,result)=>{
		if(err) throw err;
		res.send(result);
 	})
});
//用户详情
router.get('/detail',(req,res)=>{
	var uid=req.query.uid
	if(!uid){
		res.send('2');
		return;
	}
	var sql='SELECT*FROM nori_user WHERE uid=?';
	pool.query(sql,[uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result);
			return;
		}else{
			res.send('0');
			return;
		}
	});
})
//用户修改
router.post('/update',(req,res)=>{
	var obj=req.body;
	console.log(obj)
	var num=400;
	for(var key in obj){
		num++;
		if(!obj[key]){
			res.send(key);
			return;
		}
	}
	var sql='UPDATE nori_user SET upwd=?,email=?,phone=?,user_name=?,sex=? WHERE uid=?';
	pool.query(sql,[obj.upwd,obj.email,obj.phone,obj.user_name,obj.sex,obj.uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1");
			return;
		}else{
			res.send("0");
			return;
		}
	})
})
//用户删除
router.get('/delete',(req,res)=>{
	var uid=req.query.uid;
//	if(!uid){
//		res.json({code:401,msg:'编号不能为空'});
//		return;
//	}
	var sql='DELETE FROM nori_user WHERE uid=?';
	console.log(sql)
	pool.query(sql,[uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send('删除成功');
			return;
		}else{
			res.send('删除失败');
			return;
		}
	})
});
module.exports=router;