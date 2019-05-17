const express = require('express');
const pool = require('../pool.js');
var router = express.Router();
//图库请求
router.get('/get_images', (req, res) => {
	console.log('请求图片列表')
	var sort = "ORDER BY " + req.query.sort;
	var start = parseInt(req.query.start);
	var count = parseInt(req.query.count);
	var sql = "select*from nori_tuku " + sort + "tid ASC LIMIT ?,?";
	// console.log(sql)
	pool.query(sql, [start, count], (err, result) => {
		if (err) throw err;
		res.send(result);
	})
})
//增加点击
router.post('/add_count', (req, res) => {
	var tid = parseInt(req.body.tid)
	var click_count = parseInt(req.body.click_count)
	console.log(`点击编号为${tid}的图片`)
	var sql = `UPDATE nori_tuku SET click_count=? WHERE tid=?;`
	pool.query(sql, [click_count, tid], (err, result) => {
		if (err) throw err;
		res.send("200");
	})
})
module.exports = router;