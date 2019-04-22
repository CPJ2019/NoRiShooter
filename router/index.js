const express=require('express');
var router=express.Router();
//设置主页
router.get('/',(req,res)=>{
	res.sendFile('index.html');
})
module.exports=router;