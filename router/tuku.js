const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//图库录入
router.get('/get_images',(req,res)=>{
	console.log('请求图片列表')
	var sort="ORDER BY "+req.query.sort;
	console.log(sort)
	var start=parseInt(req.query.start);
	var count=parseInt(req.query.count);
	var sql="select*from nori_tuku "+sort+" LIMIT ?,?";
	// console.log(sql)
	pool.query(sql,[start,count],(err,result)=>{
		if(err) throw err;
		res.send(result);
 	})
})
module.exports=router;