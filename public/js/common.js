// 回顶部
function to_top() {
	(() => {
		// 防止还在回顶部的过程中重复设置定时器
		clearInterval(timer);
		var timer;
		// 当前屏幕滚动位置
		var target = document.documentElement.scrollTop;
		// 回到首页字样隐藏
		to_top_hover.style.display = "none";
		// 开始回滚图标的动画并保持最后一帧
		to_top_btn.style.animation = "totop1 0.2s 1 forwards";
		var timer = setInterval(function () {
			console.log(target);
			//做减速运动 每次回滚当前的10%
			//向上取整是为了当位置为<=10时 每次回滚距离都为1 可以使回滚位置能到达0
			target -= Math.ceil(target / 10);
			window.scrollTo(0, target);
			if (target == 0) {
				clearInterval(timer);
				// 回滚图标恢复原样
				to_top_btn.style.animation = "totop2 0.2s 1 forwards";
				// 恢复原样后回到首页字样重新显示 0.5s更舒适
				setTimeout(function () {
					to_top_hover.style.display = "block";
				}, 500)
				return;
			}
		}, 10);
	})()
}